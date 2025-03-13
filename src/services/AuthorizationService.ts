import { v4 as uuidv4 } from "uuid";
import type {
  CreateRoleForm,
  UpdatePermissionForm,
} from "../forms/authorization";
import { Role } from "../models/Role";
import { Permission } from "../models/Permission";
import type { HttpResponseType } from "../common/HttpResponse";
import HttpResponse from "../common/HttpResponse";
import { JwtService } from "../common/JWTService";
import { User } from "../models/User";

type PermissionGroup = "read" | "write" | "delete";

/**
 * Service responsible for handling role-based authorization and permissions
 * This includes creating/updating roles and managing their permissions
 */
export class AuthorizationService {
  private jwtService: JwtService;
  protected permissions: {
    key: string;
    name: string;
  }[] = [
    // Admin permissions
  ];

  constructor(request: Request) {
    this.jwtService = new JwtService(request);
  }

  /**
   * Creates or updates a role based on the provided data
   * If role_uuid is present, it updates the existing role
   * @param data - The role creation/update form data
   * @returns Newly created or updated Role object, or HTTP error response
   */
  async createRole(data: CreateRoleForm): Promise<Role | HttpResponseType> {
    if (data.role_uuid) {
      return this.updateRole(data);
    }

    const role = Role.create({
      name: data.name,
      editable_name: data.editable_name,
    });

    await role.save();

    return role;
  }

  /**
   * Updates an existing role with new information
   * @param data - The role update form data containing role_uuid
   * @returns Updated Role object, or HTTP error response if role not found
   */
  async updateRole(data: CreateRoleForm): Promise<Role | HttpResponseType> {
    const role = await Role.findOne({ where: { uuid: data.role_uuid } });

    if (!role) {
      return HttpResponse.failure("Role not found", 400);
    }
    await Role.update(
      { uuid: data.role_uuid },
      {
        name: data.name || role.name,
        editable_name: data.editable_name || role.editable_name,
      }
    );

    return role;
  }

  /**
   * Updates permissions for a specific role
   * Handles creation and updates of read, write, and delete permissions
   * @param data - Object containing role_uuid and permissions JSON string
   * @returns Success message or HTTP error response
   */
  async updatePermissionInRole(
    data: UpdatePermissionForm
  ): Promise<string | HttpResponseType> {
    const role = await Role.findOne({ where: { uuid: data.role_uuid } });

    if (!role) {
      return HttpResponse.failure("Role not found", 400);
    }

    const permissions = data.permissions;

    const subKeyOptions: PermissionGroup[] = ["read", "write", "delete"];

    for (const permissionGroup of permissions) {
      for (const value of subKeyOptions) {
        const currentPermission = await Permission.findOne({
          where: {
            key: permissionGroup.key,
            sub_key: value,
            role_id: role.id.toString(),
          },
        });

        if (currentPermission) {
          await Permission.update(
            { uuid: currentPermission.uuid },
            {
              status: permissionGroup[
                value as keyof typeof permissionGroup
              ] as boolean,
            }
          );
        } else {
          await Permission.create({
            name: permissionGroup.name,
            role_id: role.id.toString(),
            key: permissionGroup.key,
            sub_key: value,
            status: permissionGroup[
              value as keyof typeof permissionGroup
            ] as boolean,
          });
        }
      }
    }

    return "Role permissions updated";
  }

  /**
   * Checks if the current user has a specific permission
   * @param permission_name - The name of the permission to check
   * @returns Boolean indicating if user has permission, or HTTP error response
   */
  async userCan(permission_name: string): Promise<boolean | HttpResponseType> {
    const user = await User.findOne({
      where: { uuid: this.jwtService.getCurrentUserId() },
    });
    const permission = user?.role?.permissions?.find(
      (permission) => permission.name === permission_name
    );

    if (!permission) {
      return HttpResponse.failure("Permission not found", 400);
    }

    return permission.status;
  }
}

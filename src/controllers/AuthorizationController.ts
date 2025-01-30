import HttpResponse from "../common/HttpResponse";
import type { CreateRoleForm, UpdatePermissionForm } from "../forms/authorization";
import { Role } from "../models";
import type { BunRequest } from "../routes/router";
import { AuthorizationService } from "../services/AuthorizationService";

export class AuthorizationController {

    // Create a new role
    async createRole(request: BunRequest) {
        let data: CreateRoleForm = await request.json() as CreateRoleForm;
        let response = await new AuthorizationService(request).createRole(data);

        if (response instanceof Role) {
            return HttpResponse.success('Role created successfully', response);
        }

        return response;
    }
    
    // Update permissions in a role
    async updatePermissionInRole(request: BunRequest) {
        let data: UpdatePermissionForm = await request.json() as UpdatePermissionForm;
        let response = await new AuthorizationService(request).updatePermissionInRole(data);

        if (typeof response === 'string') {
            return HttpResponse.success('Role updated successfully', response);
        }

        return response;
    }

    // User can permission
    async userCan(request: BunRequest) {
        let permission_name = request.params.permission_name;
        let response = await new AuthorizationService(request).userCan(permission_name);

        if (typeof response === 'boolean') {
            return HttpResponse.success('User can permission', response);
        }

        return response;
    }
}
import { Entity, Column, OneToMany, Generated } from "typeorm";
import { BaseModel } from "./BaseModel";
import { User } from "./User";
import type { User as UserType } from "./User";
import type { Permission as PermissionType } from "./Permission";
import { Permission } from "./Permission";

@Entity({ name: "roles" })
export class Role extends BaseModel {
  @Column({ unique: true })
  @Generated("uuid")
  uuid!: string;

  @Column({ length: 255 })
  name!: string;

  @Column({ type: "text", nullable: true })
  editable_name?: string | null;

  @Column({ type: "text", nullable: true })
  description?: string | null;

  @OneToMany(() => User, (user) => user.role)
  users?: UserType[];

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions?: PermissionType[];
}

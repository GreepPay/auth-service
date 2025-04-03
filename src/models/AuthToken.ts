import { Entity, Column } from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity({ name: "auth_service.auth_tokens" })
export class AuthToken extends BaseModel {
  @Column({ length: 36 })
  auth_id!: string;

  @Column()
  auth_token!: string;
}

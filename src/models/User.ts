import { Entity, Column, ManyToOne, JoinColumn, Generated } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Role } from "./Role";
import type { Role as RoleType } from "./Role";

@Entity({ name: "users" })
export class User extends BaseModel {
  @Column({ unique: true })
  @Generated("uuid")
  uuid!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column({ nullable: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true, type: "timestamp" })
  email_verified_at?: Date;

  @Column({ select: false })
  password!: string;

  @Column({ select: false, type: "timestamp" })
  password_created_at!: Date;

  @Column({ nullable: true, type: "timestamp" })
  phone_verified_at?: Date;

  @Column({ default: "active" })
  status!: string;

  @Column({ select: false, nullable: true })
  otp?: string;

  @Column({ select: false, nullable: true, type: "timestamp" })
  otp_expired_at?: Date;

  @Column({ nullable: true })
  role_id?: string;

  @Column({ nullable: true, type: "timestamp" })
  deleted_at?: Date;

  @Column({ nullable: true })
  sso_id?: string;

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: "role_id" })
  role?: RoleType;

  // Virtual property that combines first_name and last_name
  get full_name(): string {
    return `${this.first_name} ${this.last_name}`.trim();
  }
}

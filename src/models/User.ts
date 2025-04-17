import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Role } from "./Role";
import type { Role as RoleType } from "./Role";

@Entity({ name: "users" })
export class User extends BaseModel {
  @Column({ unique: true })
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

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  transaction_pin?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  default_currency?: string;

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: "role_id" })
  role?: RoleType;

  get full_name(): string {
    return `${this.first_name} ${this.last_name}`.trim();
  }
}

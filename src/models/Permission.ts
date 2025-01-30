import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Role } from './Role';

@Entity()
export class Permission extends BaseModel {
    @Column({ length: 36 })
    uuid!: string;

    @Column({ length: 36 })
    role_id!: string;

    @ManyToOne(() => Role, role => role.permissions)
    @JoinColumn({ name: 'role_id' })
    role!: Role;

    @Column({ default: false })
    status!: boolean;

    @Column({ length: 255 })
    name!: string;

    @Column({ length: 255 })
    key!: string;

    @Column({ length: 255 })
    sub_key!: string;
}
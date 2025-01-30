import { Entity, Column, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import { User } from './User';
import { Permission } from './Permission';

@Entity()
export class Role extends BaseModel {
    @Column({ length: 36 })
    uuid!: string;

    @Column({ length: 255 })
    name!: string;

    @Column({ type: 'text', nullable: true })
    editable_name?: string | null;

    @Column({ type: 'text', nullable: true })
    description?: string | null;

    @OneToMany(() => User, user => user.role)
    users?: User[];

    @OneToMany(() => Permission, permission => permission.role)
    permissions?: Permission[];
}
import { Entity, Column } from 'typeorm';
import { BaseModel } from './BaseModel';

@Entity()
export class AuthToken extends BaseModel {
    @Column({ length: 36 })
    auth_id!: string;

    @Column()
    auth_token!: string;
}
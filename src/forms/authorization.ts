export interface CreateRoleForm {
    name: string;
    editable_name: string;
    role_uuid?: string;
}

export interface UpdatePermissionForm {
    role_uuid: string;
    permissions: {
        key: string;
        name: string;
        read: boolean;
        write: boolean;
        delete: boolean;
    }[];
}
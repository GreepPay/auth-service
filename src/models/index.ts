export * from "./User";
export * from "./Role";
export * from "./Permission";
export * from "./AuthToken";

/**
 * @swagger
 * definitions:
 *   BaseModel:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier
 *         readOnly: true
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: Creation timestamp
 *         readOnly: true
 *       updated_at:
 *         type: string
 *         format: date-time
 *         description: Last update timestamp
 *         readOnly: true
 */

/**
 * @swagger
 * definitions:
 *   AuthToken:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier
 *         readOnly: true
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: Creation timestamp
 *         readOnly: true
 *       updated_at:
 *         type: string
 *         format: date-time
 *         description: Last update timestamp
 *         readOnly: true
 *       auth_id:
 *         type: string
 *         description: Authentication ID
 *         maxLength: 36
 *       auth_token:
 *         type: string
 *         description: Authentication token
 */

/**
 * @swagger
 * definitions:
 *   Permission:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier
 *         readOnly: true
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: Creation timestamp
 *         readOnly: true
 *       updated_at:
 *         type: string
 *         format: date-time
 *         description: Last update timestamp
 *         readOnly: true
 *       uuid:
 *         type: string
 *         description: Unique identifier
 *         maxLength: 36
 *       role_id:
 *         type: string
 *         description: Role ID
 *       role:
 *         $ref: '#/definitions/Role'
 *         description: The role associated with the permission
 *       status:
 *         type: boolean
 *         description: Status of the permission
 *         default: false
 *       name:
 *         type: string
 *         description: Name of the permission
 *         maxLength: 255
 *       key:
 *         type: string
 *         description: Key of the permission
 *         maxLength: 255
 *       sub_key:
 *         type: string
 *         description: Sub-key of the permission
 *         maxLength: 255
 */

/**
 * @swagger
 * definitions:
 *   Role:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier
 *         readOnly: true
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: Creation timestamp
 *         readOnly: true
 *       updated_at:
 *         type: string
 *         format: date-time
 *         description: Last update timestamp
 *         readOnly: true
 *       uuid:
 *         type: string
 *         description: Unique identifier
 *         maxLength: 36
 *       name:
 *         type: string
 *         description: Name of the role
 *         maxLength: 255
 *       editable_name:
 *         type: string
 *         description: Editable name of the role
 *         nullable: true
 *       description:
 *         type: string
 *         description: Description of the role
 *         nullable: true
 *       users:
 *         type: array
 *         items:
 *           $ref: '#/definitions/User'
 *         description: List of users with this role (populated by relation)
 *         readOnly: true
 *       permissions:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Permission'
 *         description: List of permissions assigned to this role (populated by relation)
 *         readOnly: true
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier
 *         readOnly: true
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: Creation timestamp
 *         readOnly: true
 *       updated_at:
 *         type: string
 *         format: date-time
 *         description: Last update timestamp
 *         readOnly: true
 *       uuid:
 *         type: string
 *         description: Unique identifier
 *       first_name:
 *         type: string
 *         description: First name of the user
 *       last_name:
 *         type: string
 *         description: Last name of the user
 *       username:
 *         type: string
 *         description: Username of the user
 *       email:
 *         type: string
 *         format: email
 *         description: Email address of the user
 *       phone:
 *         type: string
 *         description: Phone number of the user
 *         nullable: true
 *       email_verified_at:
 *         type: string
 *         format: date-time
 *         description: Timestamp when email was verified
 *         nullable: true
 *       password:
 *         type: string
 *         description: User password (write-only)
 *         writeOnly: true
 *       password_created_at:
 *         type: string
 *         format: date-time
 *         description: Timestamp when password was created
 *         writeOnly: true
 *       phone_verified_at:
 *         type: string
 *         format: date-time
 *         description: Timestamp when phone was verified
 *         nullable: true
 *       status:
 *         type: string
 *         description: Status of the user (e.g., active, inactive)
 *         default: active
 *       otp:
 *         type: string
 *         description: One-time password (write-only)
 *         writeOnly: true
 *         nullable: true
 *       otp_expired_at:
 *         type: string
 *         format: date-time
 *         description: Timestamp when OTP expires (write-only)
 *         writeOnly: true
 *         nullable: true
 *       role_id:
 *         type: string
 *         description: Role ID
 *         nullable: true
 *       deleted_at:
 *         type: string
 *         format: date-time
 *         description: Timestamp when user was deleted (soft delete)
 *         nullable: true
 *       sso_id:
 *         type: string
 *         description: Single sign-on ID
 *         nullable: true
 *       role:
 *         $ref: '#/definitions/Role'
 *         description: The role associated with the user
 *         nullable: true
 *       full_name:
 *         type: string
 *         description: Full name of the user (first name + last name)
 *         readOnly: true
 */

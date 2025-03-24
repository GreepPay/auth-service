import { AuthorizationController } from "../controllers/AuthorizationController";
import router, { type BunRequest } from "./router";
import {
  type CreateRoleForm,
  type UpdatePermissionForm,
} from "../forms/authorization";

const APP_VERSION = "v1";

/**
 * @swagger
 * /v1/auth/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Authorization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoleForm'
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role created successfully
 *                 data:
 *                   type: object
 *                   description: Role data
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The UUID of the created role.
 *                       example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid request body
 */
router.add(
  "POST",
  `/${APP_VERSION}/auth/roles`,
  async (request: BunRequest) => {
    const result = await new AuthorizationController().createRole(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/auth/permissions:
 *   post:
 *     summary: Update permissions for a role
 *     tags: [Authorization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePermissionForm'
 *     responses:
 *       200:
 *         description: Permissions updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permissions updated successfully
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid request body
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role not found
 */
router.add(
  "POST",
  `/${APP_VERSION}/auth/permissions`,
  async (request: BunRequest) => {
    const result = await new AuthorizationController().updatePermissionInRole(
      request,
    );
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/auth/user-can/{permission_name}:
 *   get:
 *     summary: Check if user has specific permission
 *     tags: [Authorization]
 *     parameters:
 *       - in: path
 *         name: permission_name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the permission to check
 *     responses:
 *       200:
 *         description: Returns whether user has the permission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 can:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid request
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */
router.add(
  "GET",
  `/${APP_VERSION}/auth/user-can/:permission_name`,
  async (request: BunRequest) => {
    const result = await new AuthorizationController().userCan(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateRoleForm:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the role
 *           example: "Administrator"
 *         editable_name:
 *           type: string
 *           description: Editable name of the role
 *           example: "Admin"
 *         role_uuid:
 *           type: string
 *           description: UUID of the role (optional, for updates)
 *           example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *     UpdatePermissionForm:
 *       type: object
 *       properties:
 *         role_uuid:
 *           type: string
 *           description: UUID of the role
 *           example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *         permissions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 description: Key of the permission
 *                 example: "users.view"
 *               name:
 *                 type: string
 *                 description: Name of the permission
 *                 example: "View Users"
 *               read:
 *                 type: boolean
 *                 description: Read permission
 *                 example: true
 *               write:
 *                 type: boolean
 *                 description: Write permission
 *                 example: false
 *               delete:
 *                 type: boolean
 *                 description: Delete permission
 *                 example: false
 */

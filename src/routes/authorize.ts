import { AuthorizationController } from "../controllers/AuthorizationController";
import router, { type BunRequest } from "./router";
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the role
 *               editable_name:
 *                 type: string
 *                 description: Editable name of the role
 *               role_uuid:
 *                 type: string
 *                 description: UUID of the role (optional, for updates)
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Invalid request
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
 *             type: object
 *             properties:
 *               role_uuid:
 *                 type: string
 *                 description: UUID of the role
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     key:
 *                       type: string
 *                       description: Key of the permission
 *                     name:
 *                       type: string
 *                       description: Name of the permission
 *                     read:
 *                       type: boolean
 *                       description: Read permission
 *                     write:
 *                       type: boolean
 *                       description: Write permission
 *                     delete:
 *                       type: boolean
 *                       description: Delete permission
 *     responses:
 *       200:
 *         description: Permissions updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Role not found
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
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
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

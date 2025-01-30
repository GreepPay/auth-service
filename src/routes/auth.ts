import { AuthenticationController } from '../controllers/AuthenticationController';
import router, { type BunRequest } from './router';

const APP_VERSION = 'v1';

/**
 * @swagger
 * /v1/auth/me:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get authenticated user details
 *     description: Returns the currently authenticated user's information
 *     responses:
 *       200:
 *         description: Successfully retrieved user information
 *       401:
 *         description: Unauthorized - User not authenticated
 */
router.add('GET', `/${APP_VERSION}/auth/me`, async (request: BunRequest) => {
    const result = await new AuthenticationController().getAuthUser(request);

    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

/**
 * @swagger
 * /v1/auth/users:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Create new user
 *     description: Register a new user in the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Invalid input data
 */
router.add('POST', `/${APP_VERSION}/auth/users`, async (request: BunRequest) => {
    const result = await new AuthenticationController().createAuthUser(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login
 *     description: Authenticate a user and return a token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Invalid credentials
 */
router.add('POST', `/${APP_VERSION}/auth/login`, async (request: BunRequest) => {
    const result = await new AuthenticationController().login(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

/**
 * @swagger
 * /v1/auth/reset-otp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Reset OTP
 *     description: Generate a new OTP for user verification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP reset successful
 *       404:
 *         description: User not found
 */
router.add('POST', `/${APP_VERSION}/auth/reset-otp`, async (request: BunRequest) => {
    const result = await new AuthenticationController().resetUserOtp(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

/**
 * @swagger
 * /v1/auth/verify-otp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Verify OTP
 *     description: Verify the OTP provided by the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 *       404:
 *         description: User not found
 */
router.add('POST', `/${APP_VERSION}/auth/verify-otp`, async (request: BunRequest) => {
    const result = await new AuthenticationController().verifyUserOtp(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

/**
 * @swagger
 * /v1/auth/update-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Update user password
 *     description: Update the authenticated user's password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid password format
 *       401:
 *         description: Current password is incorrect
 */
router.add('POST', `/${APP_VERSION}/auth/update-password`, async (request: BunRequest) => {
    const result = await new AuthenticationController().updateUserPassword(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

/**
 * @swagger
 * /v1/auth/update-profile:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Update user profile
 *     description: Update the authenticated user's profile information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: User not authenticated
 */
router.add('POST', `/${APP_VERSION}/auth/update-profile`, async (request: BunRequest) => {
    const result = await new AuthenticationController().updateUserProfile(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

/**
 * @swagger
 * /v1/auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User logout
 *     description: Logout the currently authenticated user
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: User not authenticated
 */
router.add('POST', `/${APP_VERSION}/auth/logout`, async (request: BunRequest) => {
    const result = await new AuthenticationController().logout(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

/**
 * @swagger
 * /v1/auth/users/{id}:
 *   delete:
 *     tags:
 *       - Authentication
 *     summary: Delete user
 *     description: Delete a user account by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to delete
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - User doesn't have permission
 *       404:
 *         description: User not found
 */
router.add('DELETE', `/${APP_VERSION}/auth/users/:id`, async (request: BunRequest) => {
    const result = await new AuthenticationController().deleteUser(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});
import { AuthenticationController } from '../controllers/AuthenticationController';
import router, { type BunRequest } from './router';

const APP_VERSION = 'v1';

// Register auth routes
router.add('GET', `/${APP_VERSION}/auth/me`, async (request: BunRequest) => {
    const result = await new AuthenticationController().getAuthUser(request);

    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

router.add('POST', `/${APP_VERSION}/auth/users`, async (request: BunRequest) => {
    const result = await new AuthenticationController().createAuthUser(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

router.add('POST', `/${APP_VERSION}/auth/login`, async (request: BunRequest) => {
    const result = await new AuthenticationController().login(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});


router.add('POST', `/${APP_VERSION}/auth/reset-otp`, async (request: BunRequest) => {
    const result = await new AuthenticationController().resetUserOtp(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

router.add('POST', `/${APP_VERSION}/auth/verify-otp`, async (request: BunRequest) => {
    const result = await new AuthenticationController().verifyUserOtp(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

router.add('POST', `/${APP_VERSION}/auth/update-password`, async (request: BunRequest) => {
    const result = await new AuthenticationController().updateUserPassword(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

router.add('POST', `/${APP_VERSION}/auth/update-profile`, async (request: BunRequest) => {
    const result = await new AuthenticationController().updateUserProfile(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

router.add('POST', `/${APP_VERSION}/auth/logout`, async (request: BunRequest) => {
    const result = await new AuthenticationController().logout(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

router.add('DELETE', `/${APP_VERSION}/auth/users/:id`, async (request: BunRequest) => {
    const result = await new AuthenticationController().deleteUser(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});
import { AuthorizationController } from "../controllers/AuthorizationController";
import router, { type BunRequest } from "./router";
const APP_VERSION = 'v1';

// Register authorization routes
router.add('POST', `/${APP_VERSION}/auth/roles`, async (request: BunRequest) => {
    const result = await new AuthorizationController().createRole(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

router.add('POST', `/${APP_VERSION}/auth/permissions`, async (request: BunRequest) => {
    const result = await new AuthorizationController().updatePermissionInRole(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});

router.add('GET', `/${APP_VERSION}/auth/user-can/:permission_name`, async (request: BunRequest) => {
    const result = await new AuthorizationController().userCan(request);
    return new Response(JSON.stringify(result.body), {
        headers: { 'Content-Type': 'application/json' },
        status: result.statusCode
    });
});
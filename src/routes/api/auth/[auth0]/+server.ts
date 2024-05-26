import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
// both of these import statements will throw an error on `npm run build`
// import { initAuth0 } from '@auth0/nextjs-auth0/edge'; // fails due to 'ERR_REQUIRE_ESM'
// this import statement will function in `npm run dev`
import { initAuth0 } from '@auth0/nextjs-auth0' // fails to build for Cloudflare due to openid-client require http, https, url, querystring

/**
 * In order to use the Auth0 NextJS SDK, we need to 'fake' a NextJS request object.
 * NextJS sets a cookie, as well as other things which may not be used by the Auth0 SDK.
 */
function makeNextRequest(req: Request) {
  const rawCookie = req.headers.get('cookie') || '';
  const cookies = rawCookie
    .split(';')
    .map((v) => v.split('='))
    .reduce(
      (acc, v) => {
        acc.set(decodeURIComponent(v[0].trim()), decodeURIComponent(v[1].trim()));
        return acc;
      },
      new Map<string, string>
    );
  // use any instead of satisfying full NextRequest type and loading this library
  // https://nextjs.org/docs/app/api-reference/functions/next-request
  const nextJsRequest: any = req;
  nextJsRequest.cookies = cookies;
  return nextJsRequest;
}

export const GET = ((data) => {
  const req = data.request;
  const nextJSRequest = makeNextRequest(req);
  const auth0 = initAuth0({
    secret: data.platform?.env?.AUTH0_SECRET,
    baseURL: data.platform?.env?.APP_URL,
    clientID: data.platform?.env?.AUTH0_CLIENT_ID,
    clientSecret: data.platform?.env?.AUTH0_CLIENT_SECRET,
    issuerBaseURL: data.platform?.env?.AUTH0_DOMAIN,
  });

  // does not appear to be used, just set params to satisfy type
  const ctx = { params: {} };
  
  // not supported, auth0.handleBackchannelLogout(nextJSRequest, ctx);
  switch (data.params.auth0) {
    case 'login':
      return auth0.handleLogin(nextJSRequest, ctx);
    case 'logout':
      return auth0.handleLogout(nextJSRequest, ctx);
    case 'callback':
      return auth0.handleCallback(nextJSRequest, ctx);
    case 'me':
      return auth0.handleProfile(nextJSRequest, ctx);
    default:
      return error(404, { message: 'Not found' });
  }
}) satisfies RequestHandler;

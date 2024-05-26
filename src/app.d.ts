// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
        interface Platform {
            env: {
                APP_URL: string;
                AUTH0_SECRET: string;
                AUTH0_DOMAIN: string;
                AUTH0_CLIENT_ID: string;
                AUTH0_CLIENT_SECRET: string;
            };
            cf: CfProperties
            ctx: ExecutionContext
        }
    }
}

export {};
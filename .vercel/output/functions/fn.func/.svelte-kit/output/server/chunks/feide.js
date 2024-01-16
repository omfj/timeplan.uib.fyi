import { F as FEIDE_CLIENT_ID, a as FEIDE_CLIENT_SECRET } from './private.js';
import { OAuth2Client } from 'oslo/oauth2';
const baseURL = 'https://uib.fyi';
const authorizeEndpoint = 'https://auth.dataporten.no/oauth/authorization';
const tokenEndpoint = 'https://auth.dataporten.no/oauth/token';
class Feide {
	client;
	clientSecret;
	constructor(clientId, clientSecret, options) {
		this.client = new OAuth2Client(clientId, authorizeEndpoint, tokenEndpoint, {
			redirectURI: options?.redirectURI
		});
		this.clientSecret = clientSecret;
	}
	async createAuthorizationURL(state, options) {
		const url = await this.client.createAuthorizationURL({
			scopes: options?.scopes ?? []
		});
		url.searchParams.set('state', state);
		return url;
	}
	async validateAuthorizationCode(code) {
		const result = await this.client.validateAuthorizationCode(code, {
			authenticateWith: 'request_body',
			credentials: this.clientSecret
		});
		const tokens = {
			accessToken: result.access_token,
			tokenType: result.token_type,
			expiresAt: /* @__PURE__ */ new Date().getTime() / 1e3 + result.expires_in,
			scope: result.scope,
			idToken: result.id_token
		};
		return tokens;
	}
}
const feideAuth = new Feide(FEIDE_CLIENT_ID, FEIDE_CLIENT_SECRET, {
	redirectURI: `${baseURL}/api/auth/feide/callback`
});
async function getFeideUser(accessToken) {
	const feideUser = await fetch('https://auth.dataporten.no/userinfo', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	}).then((r) => r.json());
	return {
		id: feideUser.user.userid,
		email: feideUser.user.email,
		name: feideUser.user.name
	};
}
export { feideAuth as f, getFeideUser as g };

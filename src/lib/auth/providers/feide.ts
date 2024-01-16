import { FEIDE_CLIENT_ID, FEIDE_CLIENT_SECRET } from '$env/static/private';
import { baseURL } from '../../utils';
import { Feide } from './feide-provider';

type FeideUser = {
	user: {
		userid_sec: [];
		userid: string;
		name: string;
		email: string;
		profilephoto: string;
	};
	audience: string;
};

export const feideAuth = new Feide(FEIDE_CLIENT_ID, FEIDE_CLIENT_SECRET, {
	redirectURI: `${baseURL}/api/auth/feide/callback`
});

export async function getFeideUser(
	accessToken: string
): Promise<{ id: string; email: string; name: string }> {
	const feideUser: FeideUser = await fetch('https://auth.dataporten.no/userinfo', {
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

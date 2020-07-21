import http from './httpService';
import config from '../config.json';

export function auth(user) {
	return http.post(config.apiEndPoint + "auth", {
		email: user.username,
		password: user.password,
	});
}
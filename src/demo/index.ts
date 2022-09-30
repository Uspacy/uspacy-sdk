import Uspacy from '../index';
import { logout } from './logout';
import { hasRemember, setRemember } from './remember';
import { getRefreshToken, getToken, setRefreshToken, setToken } from './token';

const uspacyClient = Uspacy({
	apiUrl: 'https://stage.uspacy.com.ua',
});

const start = async () => {
	const { httpClient } = uspacyClient;
	httpClient.interceptors.request.use((res) => {
		const token = getToken();
		if (token && res.headers) res.headers['Authorization'] = `Bearer ${token}`;
		return res;
	});
	httpClient.interceptors.response.use(
		(response) => {
			if (response.config.url?.includes('/auth/signIn')) {
				setToken(response.data.jwt);
				setRemember();
				setRefreshToken(response.data.refreshToken);
			}
			return response;
		},
		async (error) => {
			try {
				const originalRequest = error.config;
				if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes('auth/refreshToken')) {
					if (!hasRemember()) throw new Error('logout');
					console.log(111);
					const refreshToken = getRefreshToken();
					if (!refreshToken) throw new Error('logout');
					originalRequest._retry = true;
					const newToken = await uspacyClient.auth.refreshToken(refreshToken);
					originalRequest.headers['Authorization'] = `Bearer ${newToken.data.jwt}`;
					return httpClient(originalRequest);
				}
			} catch(_) {
				logout();
				return Promise.reject(error);
			}
		}
	);
	const token = getToken();
	await uspacyClient.auth.login('root@gmail.com', '123456');
	console.log(token);
	// fetch('https://stage.uspacy.com.ua/company/v1/users/', {
	// 	method: 'GET',
	// 	headers: {
	// 		Accept: 'application/json',
	// 		'Content-Type': 'application/json',
	// 		Authorization: `Bearer ${token}`,
	// 	},
	// }).catch((err) => console.log(err));
	// await uspacyClient.users.list(1, 3);
	// setToken(res3.data.jwt);
	// setRefreshToken(res3.data.refreshToken);
	// const res = await uspacyClient.users.list();
	// const res1 = await uspacyClient.users.list();
	// const res2 = await uspacyClient.users.list();
	// console.log(res);
};

start();

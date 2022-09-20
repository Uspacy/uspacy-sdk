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
		if (token) res.headers['Authorization'] = `Bearer ${token}`;
		return res;
	});
	httpClient.interceptors.response.use(
		(response) => {
			if (response.config.url.includes('/auth/login')) {
				setToken(response.data.jwt);
				if (response.config.params.remember) {
					setRemember();
					setRefreshToken(response.data.refreshToken);
				}
			}
			return response;
		},
		async (error) => {
			try {
				const originalRequest = error.config;
				if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes('auth/refreshToken')) {
					if (!hasRemember()) throw new Error('logout');
					originalRequest._retry = true;
					const refreshToken = getRefreshToken();
					const newToken = await httpClient.post('/api/auth/refreshToken', null, {
						headers: {
							...(refreshToken && {Authorization: `Bearer ${refreshToken}`}),
						},
					});
					originalRequest.headers['Authorization'] = `Bearer ${newToken.data.jwt}`;
					return httpClient(originalRequest);
				}
			} catch(_) {
				logout();
				return Promise.reject(error);
			}
		}
	);
	await uspacyClient.auth.login('root@gmail.com', '123456');
	// await uspacyClient.users.list(2, 3);
	// setToken(res3.data.jwt);
	// setRefreshToken(res3.data.refreshToken);
	// const res = await uspacyClient.users.list();
	// const res1 = await uspacyClient.users.list();
	// const res2 = await uspacyClient.users.list();
	// console.log(res);
};

start();

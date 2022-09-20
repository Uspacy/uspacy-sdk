import { AxiosResponse } from 'axios';

export interface ReponseLogin {
	jwt: string;
	refreshToken: string;
	expiresInSeconds: number;
}

export interface ReponseUserList {
	jwt: string;
	refreshToken: string;
	expiresInSeconds: number;
}

export interface AuthInstance {
	login(email: string, password: string): Promise<AxiosResponse<ReponseLogin>>;
	refreshToken(refreshToken: string): Promise<AxiosResponse<ReponseLogin>>;
}

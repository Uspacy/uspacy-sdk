import { removeRemember } from './remember';
import { removeRefreshToken, removeToken } from './token';

export const logout = (cb?: () => void) => {
	removeToken();
	removeRefreshToken();
	removeRemember();
	cb?.();
};

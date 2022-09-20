import addDays from 'date-fns/addDays';
import addSeconds from 'date-fns/addSeconds';
import cookie from 'js-cookie';

import { APP_PREFIX } from './consts';

const TOKEN_KEY = `${APP_PREFIX}.token`;
const REFRESH_TOKEN_KEY = `${APP_PREFIX}.refreshToken`;

export const hasToken = (): boolean => !!cookie.get(TOKEN_KEY);
export const setToken = (token: string, expires = addSeconds(new Date(), 720)) => cookie.set(TOKEN_KEY, token, { expires });
export const getToken = (): string | undefined => cookie.get(TOKEN_KEY);
export const removeToken = () => cookie.remove(TOKEN_KEY);

export const hasRefreshToken = () => !!cookie.get(REFRESH_TOKEN_KEY);
export const setRefreshToken = (token: string, expires = addDays(new Date(), 30)) => cookie.set(REFRESH_TOKEN_KEY, token, { expires });
export const getRefreshToken = (): string | undefined => cookie.get(REFRESH_TOKEN_KEY);
export const removeRefreshToken = () => cookie.remove(REFRESH_TOKEN_KEY);

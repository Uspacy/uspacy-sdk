import addDays from 'date-fns/addDays';
import addSeconds from 'date-fns/addSeconds';
import cookie from 'js-cookie';

import { APP_PREFIX } from './consts';

const TOKEN_KEY = `${APP_PREFIX}.token`;
const REFRESH_TOKEN_KEY = `${APP_PREFIX}.refreshToken`;

export const hasToken = (): boolean => !!cookie.get(TOKEN_KEY);
export const setToken = (token: string, expires = 7200) => cookie.set(TOKEN_KEY, token, { expires: addSeconds(new Date(), expires) });
export const getToken = (): string | undefined => cookie.get(TOKEN_KEY);
export const removeToken = () => cookie.remove(TOKEN_KEY);

export const hasRefreshToken = () => !!cookie.get(REFRESH_TOKEN_KEY);
export const setRefreshToken = (token: string, expires = 365) => cookie.set(REFRESH_TOKEN_KEY, token, { expires: addDays(new Date(), expires) });
export const getRefreshToken = (): string | undefined => cookie.get(REFRESH_TOKEN_KEY);
export const removeRefreshToken = () => cookie.remove(REFRESH_TOKEN_KEY);

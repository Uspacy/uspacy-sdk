import { APP_PREFIX } from './consts';

interface ILocalStorage {
	getItem<T>(key: string): T | string | undefined;
	setItem(key: string, body: object | string): void;
	removeItem(key: string): void;
	clear(): void;
}

export class LocalStorage implements ILocalStorage {
	getItem<T>(key: string): T | string | undefined {
		const raw = localStorage.getItem(LocalStorage.getKey(key));
		if (!raw) return undefined;
		try {
			return JSON.parse(raw);
		} catch (err) {
			return raw;
		}
	}

	setItem(key: string, body: object | string | boolean | undefined) {
		if (!body) return;
		localStorage.setItem(LocalStorage.getKey(key), typeof body === 'object' ? JSON.stringify(body) : String(body));
	}

	removeItem(key: string) {
		localStorage.removeItem(LocalStorage.getKey(key));
	}

	clear() {
		localStorage.clear();
	}

	static getKey(key: string): string {
		return `${APP_PREFIX}.${key}`;
	}
}

export default new LocalStorage();

import storage from './localStorage';
const KEY = 'remember';

export const hasRemember = () => {
	return !!storage.getItem(KEY);
};

export const setRemember = () => {
	storage.setItem(KEY, true);
};

export const removeRemember = () => {
	storage.removeItem(KEY);
};

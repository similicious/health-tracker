import PocketBase from 'pocketbase';

export const handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase('http://localhost:5173');
	return resolve(event);
};

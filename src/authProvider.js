import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';
import decodeJwt from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL||'http://localhost:4000/api';

export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {

        const { username, password } = params;
        const request = new Request(`${API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ email:username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                const decodedToken = decodeJwt(token);
                localStorage.setItem('token', token);
                localStorage.setItem('role', decodedToken.admin);
            });
    }

    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject({ redirectTo: '/login' });
    }
    if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('role');
        return role ? Promise.resolve(role) : Promise.reject();
    }
    return Promise.reject('Unknown method');
};
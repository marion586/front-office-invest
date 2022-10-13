// Check for token and localstorage here
import store from '@/store';
import axios, { AxiosStatic } from 'axios';
import { Router } from 'vue-router';

export function routeGuard(_: Router, __: Router, next: Function) {
    next('/');
}

// guard auth
export function requiresAuthGuard(
    to: Router | any,
    _: Router | any,
    next: Function
): boolean {
    if (to.meta.requireAuth) {
        const User = store.getters['UserModule/getUserDetails'];
        const isLoggedIn = !!User;
        if (!isLoggedIn) {
            next({
                name: 'authLogin',
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
        return true;
    }
    // console.log(User);
    return false;
}

// logout
export function logoutGuard(_: Router | any, __: Router | any, next: Function) {
    delete (axios as AxiosStatic).defaults.headers.common['Authentication'];
    store.dispatch('UserModule/setUserDetails', null);
    next('/');
}

export function requiresRegistrationGuard(
    to: Router | any,
    from: Router | any,
    next: Function
) {
    if (to.meta.shouldRegisterAnUser) {
        const User = store.getters['UserModule/getRegisteredUser'];
        console.log(User, 'store user');
        if (Object.keys(User).length) {
            next();
        } else {
            next(from.fullPath);
        }
    }
}

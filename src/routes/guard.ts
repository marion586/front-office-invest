// Check for token and localstorage here
import store from '@/store';
import { Router } from 'vue-router';

export function routeGuard(to: Router, from: Router, next: Function) {
    next('/');
}

// guard auth
export function requiresAuthGuard(
    to: Router | any,
    from: Router | any,
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
export function logoutGuard(
    to: Router | any,
    from: Router | any,
    next: Function
) {
    store.dispatch('UserModule/setUserDetails', null);
    next('/');
}

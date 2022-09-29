// Check for token and localstorage here
import { Router } from 'vue-router';

export function routeGuard(to: Router, from: Router, next: Function) {
    next('/');
}

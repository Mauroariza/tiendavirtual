import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./presentation/pages/home/home.routes').then(m => m.HOME_ROUTES)
    },
    {
        path: 'products',
        loadChildren: () => import('./presentation/pages/products/products.routes').then(m => m.PRODUCTS_ROUTES),
        canActivate: [AuthGuard]
    },
    {
        path: 'cart',
        loadChildren: () => import('./presentation/pages/cart/cart.routes').then(m => m.CART_ROUTES),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

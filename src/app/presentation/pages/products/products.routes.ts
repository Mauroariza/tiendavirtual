import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./product-list/product-list.page').then(m => m.ProductListPage)
    }
]; 
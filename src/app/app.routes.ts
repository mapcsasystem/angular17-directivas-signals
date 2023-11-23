import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products.component').then((c) => c.ProductsComponent),
    children: [
      {
        path: 'product',
        loadComponent: () =>
          import('./products/pages/product-page/product-page.component').then(
            (c) => c.ProductPageComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'product',
      },
    ],
  },
  {
    path: 'signals',
    loadComponent: () =>
      import('./signals/signals.component').then((c) => c.SignalsComponent),
    children: [
      {
        path: 'counter',
        loadComponent: () =>
          import('./signals/pages/counter-page/counter-page.component').then(
            (c) => c.CounterPageComponent
          ),
      },
      {
        path: 'user-info',
        loadComponent: () =>
          import(
            './signals/pages/user-info-page/user-info-page.component'
          ).then((c) => c.UserInfoPageComponent),
      },
      {
        path: 'properties',
        loadComponent: () =>
          import(
            './signals/pages/properties-page/properties-page.component'
          ).then((c) => c.PropertiesPageComponent),
      },
      {
        path: '**',
        redirectTo: 'counter',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'signals',
  },
];

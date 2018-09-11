import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
export const mainRoutes: Routes = [
    {
        path: '', component: MainComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'user', loadChildren: './user/user.module#UserModule' },
            { path: 'function', loadChildren: './function/function.module#FunctionModule' },
            { path: 'role', loadChildren: './role/role.module#RoleModule' },
            { path: 'product-category', loadChildren: './product-category/product-category.module#ProductCategoryModule' },
            { path: 'product', loadChildren: './product/product.module#ProductModule' },

        ]
    }

]
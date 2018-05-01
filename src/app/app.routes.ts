import { Routes } from '@angular/router';
import { Auth } from './core/app.auth';
export const appRoutes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'main', loadChildren: './main/main.module#MainModule', canActivate: [Auth] },
    { path: 'error', loadChildren: './error404/error404.module#Error404Module' },
    { path: 'home', loadChildren: './home/home.module#HomeModule' }
    // tslint:disable-next-line:eofline
];
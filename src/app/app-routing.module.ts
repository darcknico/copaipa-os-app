import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { ErrorComponent } from './external/error/error.component';
import { NotFoundComponent } from './external/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'external/login',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children:[
      {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
      },
      {
        path: 'aportes',
        loadChildren: './aportes/aportes.module#AportesModule'
      },
      {
        path: 'deudas',
        loadChildren: './deudas/deudas.module#DeudasModule'
      },
      {
        path: 'recibos',
        loadChildren: './recibos/recibos.module#RecibosModule'
      },
      {
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      },
    ],
  },
  {path: 'external', loadChildren: './external/external.module#ExternalModule'},
  {path: 'error', component: ErrorComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

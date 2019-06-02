import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoDeudaComponent } from './listado-deuda/listado-deuda.component';

const routes: Routes = [
  {
    path:'',
    component:ListadoDeudaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeudasRoutingModule { }

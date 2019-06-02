import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoAporteComponent } from './listado-aporte/listado-aporte.component';

const routes: Routes = [
  {
    path:'',
    component:ListadoAporteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AportesRoutingModule { }

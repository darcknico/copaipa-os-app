import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoReciboComponent } from './listado-recibo/listado-recibo.component';

const routes: Routes = [
  {
    path:'',
    component:ListadoReciboComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecibosRoutingModule { }

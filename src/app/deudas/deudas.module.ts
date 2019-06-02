import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeudasRoutingModule } from './deudas-routing.module';
import { FiltroDeudaModalComponent } from './filtro-deuda-modal/filtro-deuda-modal.component';
import { ListadoDeudaComponent } from './listado-deuda/listado-deuda.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ListadoDeudaComponent,
    FiltroDeudaModalComponent,
  ],
  imports: [
    CommonModule,
    DeudasRoutingModule,
    IonicModule,
  ],
  entryComponents: [
    FiltroDeudaModalComponent,
  ],
})
export class DeudasModule { }

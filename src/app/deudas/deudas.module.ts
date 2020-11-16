import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeudasRoutingModule } from './deudas-routing.module';
import { FiltroDeudaModalComponent } from './filtro-deuda-modal/filtro-deuda-modal.component';
import { ListadoDeudaComponent } from './listado-deuda/listado-deuda.component';
import { IonicModule } from '@ionic/angular';
import { MercadoPagoModalComponent } from './mercado-pago-modal/mercado-pago-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ItemDeudaComponent } from './componentes/item-deuda/item-deuda.component';

@NgModule({
  declarations: [
    ListadoDeudaComponent,
    FiltroDeudaModalComponent,
    MercadoPagoModalComponent,
    ItemDeudaComponent,
  ],
  imports: [
    CommonModule,
    DeudasRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  entryComponents: [
    FiltroDeudaModalComponent,
    MercadoPagoModalComponent,
  ],
})
export class DeudasModule { }

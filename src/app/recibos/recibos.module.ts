import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecibosRoutingModule } from './recibos-routing.module';
import { FiltroReciboModalComponent } from './filtro-recibo-modal/filtro-recibo-modal.component';
import { ListadoReciboComponent } from './listado-recibo/listado-recibo.component';
import { IonicModule } from '@ionic/angular';
import { PopoverReciboComponent } from './componentes/popover-recibo/popover-recibo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListadoReciboComponent,
    FiltroReciboModalComponent,
    PopoverReciboComponent,
  ],
  imports: [
    CommonModule,
    RecibosRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    FiltroReciboModalComponent,
    PopoverReciboComponent,
  ]
})
export class RecibosModule { }

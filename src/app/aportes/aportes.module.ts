import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AportesRoutingModule } from './aportes-routing.module';
import { ListadoAporteComponent } from './listado-aporte/listado-aporte.component';
import { VerAporteModalComponent } from './ver-aporte-modal/ver-aporte-modal.component';
import { IonicModule } from '@ionic/angular';
import { FiltroAporteModalComponent } from './filtro-aporte-modal/filtro-aporte-modal.component';
import { PopoverAporteComponent } from './componentes/popover-aporte/popover-aporte.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListadoAporteComponent,
    VerAporteModalComponent,
    FiltroAporteModalComponent,
    PopoverAporteComponent,
  ],
  imports: [
    CommonModule,
    AportesRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents:[
    VerAporteModalComponent,
    FiltroAporteModalComponent,
    PopoverAporteComponent,
  ]
})
export class AportesModule { }

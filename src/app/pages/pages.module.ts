import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PerfilComponent } from './perfil/perfil.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    IonicModule,
  ]
})
export class PagesModule { }

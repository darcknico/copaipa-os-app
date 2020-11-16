import { Component, OnInit, Input } from '@angular/core';
import { Deuda } from 'src/app/_models/deuda';
import { MercadoPagoModalComponent } from '../../mercado-pago-modal/mercado-pago-modal.component';
import { Auxiliar } from 'src/app/_helpers/auxiliar';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-componentes-item-deuda',
  templateUrl: './item-deuda.component.html',
  styleUrls: ['./item-deuda.component.scss'],
})
export class ItemDeudaComponent implements OnInit {
  @Input('item') item:Deuda;
  @Input('ultimo') ultimo:boolean= false;
  monthNames=Auxiliar.dateTimeMonthNames;

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  async abrirMercadoPago(item:Deuda){
    this.modalCtrl.create({
      component: MercadoPagoModalComponent,
      componentProps:{
        item:item,
      }
    }).then((modal) => {
        modal.onDidDismiss().then((data) => {
          if(typeof data.data == 'boolean'){

          } else if(typeof data.data == 'object'){
            this.item = data.data;
          }
        });
        modal.present();

    });
  }
}

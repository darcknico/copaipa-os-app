import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Aporte, CuotaImpactada } from 'src/app/_models/aporte';

@Component({
  selector: 'app-ver-aporte-modal',
  templateUrl: './ver-aporte-modal.component.html',
  styleUrls: ['./ver-aporte-modal.component.scss'],
})
export class VerAporteModalComponent implements OnInit {
  item:Aporte;
  detalles:CuotaImpactada[] = [];

  constructor(
    private modalCtrl: ModalController,
    private navParams:NavParams,
  ) { }

  ngOnInit() {
    this.item = this.navParams.get('item');
    let filas = this.item.cuotas_impactadas.split('-');
    filas.forEach(fila=>{
      if(fila.length>6){
        let detalle = fila.split(':');
        let cuota = <CuotaImpactada>{};
        cuota.mes = Number(detalle[0]);
        cuota.anio = Number(detalle[1]);
        cuota.importe = Number(detalle[2].replace(',',''));
        if(cuota.mes > 0 && cuota.anio > 0 && cuota.importe>0){
          this.detalles.push(cuota);
        }
      }
    });
  }

  cerrar(){
    this.modalCtrl.dismiss(false);
  }
}

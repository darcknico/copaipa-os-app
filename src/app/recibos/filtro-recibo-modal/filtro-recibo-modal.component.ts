import { Component, OnInit } from '@angular/core';
import { FiltroRecibo } from 'src/app/_services/recibo.service';
import { NavParams, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Auxiliar } from 'src/app/_helpers/auxiliar';

@Component({
  selector: 'app-filtro-recibo-modal',
  templateUrl: './filtro-recibo-modal.component.html',
  styleUrls: ['./filtro-recibo-modal.component.scss'],
})
export class FiltroReciboModalComponent implements OnInit {

  fecha_desde = null;
  fecha_hasta = null;

  monthNames:string[]=Auxiliar.dateTimeMonthNames;
  private filtro:FiltroRecibo;
  hoy:string;
  constructor(
    private navParams:NavParams,
    private modalCtrl: ModalController,
    ) { }

  ngOnInit() {
    this.filtro = this.navParams.get('filtro');
    let fecha_desde = moment(this.filtro.fecha_desde);
    let fecha_hasta = moment(this.filtro.fecha_hasta);
    if(fecha_desde.isValid()){
      this.fecha_desde = fecha_desde.toISOString();
    }
    if(fecha_hasta.isValid()){
      this.fecha_hasta = fecha_hasta.toISOString();
    }
    this.hoy = moment().format('YYYY-MM-DD');
  }

  aplicar(){
    this.filtro.start = 0;
    let fecha_desde = moment(this.fecha_desde);
    let fecha_hasta = moment(this.fecha_hasta);
    if(fecha_desde.isValid()){
      this.filtro.fecha_desde = fecha_desde.format('YYYY-MM-DD');
    }
    if(fecha_hasta.isValid()){
      this.filtro.fecha_hasta = fecha_hasta.format('YYYY-MM-DD');
    }
    console.log(this.filtro);
    this.modalCtrl.dismiss(this.filtro);
  }

  limpiar(){
    this.filtro.fecha_desde = "";
    this.filtro.fecha_hasta = "";
    this.filtro.start = 0;
    this.modalCtrl.dismiss(this.filtro);
  }

  limpiar_fecha_desde = {
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Limpiar',
        handler: () =>{
          this.fecha_desde = null;
        }
      },
      {
        text: 'Seleccionar',
        handler: (data) => { 
          let year: string = data.year.value;
          let month: string = data.month.value < 10 ? '0' + data.month.value.toString(): data.month.value.toString();
          let day: string = data.day.text;
          this.fecha_desde = year + '-' + month + '-' + day;
        }
      },
    ],
    mode:'ios',
  }

  limpiar_fecha_hasta = {
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Limpiar',
        handler: () =>{
          this.fecha_hasta = null;
        }
      },
      {
        text: 'Seleccionar',
        handler: (data) => {      
          let year: string = data.year.value;
          let month: string = data.month.value < 10 ? '0' + data.month.value.toString(): data.month.value.toString();
          let day: string = data.day.value;
          this.fecha_hasta = year + '-' + month + '-' + day ;
        }
      },
    ],
    mode:'ios',
  }

  cerrar(){
    this.modalCtrl.dismiss(false);
  }
}

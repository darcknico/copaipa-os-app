import { Component, OnInit, ViewChild } from '@angular/core';
import { DeudaService, FiltroDeuda } from 'src/app/_services/deuda.service';
import { Deuda } from 'src/app/_models/deuda';
import { IonContent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Auxiliar } from 'src/app/_helpers/auxiliar';
import { MercadoPagoModalComponent } from '../mercado-pago-modal/mercado-pago-modal.component';

@Component({
  selector: 'app-listado-deuda',
  templateUrl: './listado-deuda.component.html',
  styleUrls: ['./listado-deuda.component.scss'],
})
export class ListadoDeudaComponent implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  monthNames=Auxiliar.dateTimeMonthNames;

  listado:Deuda[] = [];
  ultimo:Deuda = null;
  filtro:FiltroDeuda = {
    start:0,
    length:7,
    fecha_desde:'',
    fecha_hasta:'',
  }
  consultando:boolean = false;
  total:number = 0;
  refresherDisabled:boolean = false;
  mostrarUltimo:boolean = false;
  constructor(
    private service:DeudaService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.iniciar();
  }

  iniciar(){
    this.refrescar();
  }

  /**
   * La ultima deuda solo mostrara el boton por mercadopago
   */
  async refrescar(){
    this.listado = [];
    this.consultando = true;
    this.service.ajax(this.filtro).subscribe(response=>{
      if(response.items.length>0){
        for(let i = 0; i < response.items.length; i++){
          let item = response.items[i];
          //item.a_pagar = Number(item.importe) + Number(item.interes) - Number(item.cobrado);
          setTimeout(() => {
              this.listado.push(item);
          }, 200*(i+1));
        }
        this.filtro.start = response.items.length;
      }
      this.total = response.total_count;
      this.consultando = false;
      if(response.items.length==0){
        this.refresherDisabled = true;
      }
    });
    this.ultimo = null;
    this.service.ultimo().subscribe(response=>{
      this.ultimo = response.deuda;
      if(response.cantidad>2){
        this.mostrarUltimo = true;
      }
    })
  }

  async limpiar(){
    this.content.scrollToTop(1500);
    this.filtro.start = 0;
    this.total = 0;
    this.refrescar();
  }

  async loadData(event) {
    if (this.filtro.start == this.total) {
      event.target.complete();
      event.target.disabled = true;
      return
    }
    this.service.ajax(this.filtro).subscribe(response=>{
      this.filtro.start += response.items.length;
      for(let i = 0; i < response.items.length; i++){
        let item = response.items[i];
        ///item.a_pagar = Number(item.importe) + Number(item.interes) - Number(item.cobrado);
        setTimeout(() => {
            this.listado.push(item);
        }, 200*(i+1));
      }
      event.target.complete();
      if(response.items.length==0){
        this.refresherDisabled = true;
      }
    });
  }

  async abrirMercadoPago(item:Deuda){
    this.modalCtrl.create({
      component: MercadoPagoModalComponent,
      componentProps:{
        item:item,
      }
    }).then((modal) => {
        modal.onDidDismiss().then((data) => {
          if(data.data){
            this.limpiar();
          }
        });
        modal.present();

    });
  }

  isUltimo(item){
    let d = false;
    if(this.ultimo){
      if(this.ultimo.anio == item.anio && this.ultimo.mes == item.mes){
        d = true;
      }
    }
    return d;
  }
}

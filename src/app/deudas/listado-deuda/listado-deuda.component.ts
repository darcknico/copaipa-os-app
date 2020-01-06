import { Component, OnInit, ViewChild } from '@angular/core';
import { DeudaService, FiltroDeuda } from 'src/app/_services/deuda.service';
import { Deuda } from 'src/app/_models/deuda';
import { IonContent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Auxiliar } from 'src/app/_helpers/auxiliar';

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
  filtro:FiltroDeuda = {
    start:0,
    length:7,
    fecha_desde:'',
    fecha_hasta:'',
  }
  consultando:boolean = false;
  total:number = 0;
  constructor(
    private aporteService:DeudaService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.iniciar();
  }

  iniciar(){
    this.refrescar();
  }

  async refrescar(){
    this.listado = [];
    this.consultando = true;
    this.aporteService.ajax(this.filtro).subscribe(response=>{
      if(response.items.length>0){
        for(let i = 0; i < response.items.length; i++){
          let item = response.items[i];
          item.a_pagar = Number(item.importe) + Number(item.interes) - Number(item.cobrado);
          setTimeout(() => {
              this.listado.push(item);
          }, 200*(i+1));
        }
        this.filtro.start = response.items.length;
      }
      this.total = response.total_count;
      this.consultando = false;
    });
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
    this.aporteService.ajax(this.filtro).subscribe(response=>{
      this.filtro.start += response.items.length;
      for(let i = 0; i < response.items.length; i++){
        let item = response.items[i];
        setTimeout(() => {
            this.listado.push(item);
        }, 200*(i+1));
      }
      event.target.complete();
    });
  }
}

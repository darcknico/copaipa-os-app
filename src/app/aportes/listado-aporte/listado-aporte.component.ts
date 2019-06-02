import { Component, OnInit, ViewChild } from '@angular/core';
import { FiltroAporte, AporteService } from 'src/app/_services/aporte.service';
import { Aporte } from 'src/app/_models/aporte';
import { IonContent, IonInfiniteScroll, ModalController, PopoverController } from '@ionic/angular';
import { VerAporteModalComponent } from '../ver-aporte-modal/ver-aporte-modal.component';
import { LoadingService } from 'src/app/providers/loading.service';
import { FiltroAporteModalComponent } from '../filtro-aporte-modal/filtro-aporte-modal.component';
import { PopoverAporteComponent } from '../componentes/popover-aporte/popover-aporte.component';

@Component({
  selector: 'app-listado-aporte',
  templateUrl: './listado-aporte.component.html',
  styleUrls: ['./listado-aporte.component.scss'],
})
export class ListadoAporteComponent implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  listado:Aporte[] = [];
  filtro:FiltroAporte = {
    start:0,
    length:3,
    fecha_desde:'',
    fecha_hasta:'',
  }
  consultando:boolean = false;
  total:number = 0;
  constructor(
    private aporteService:AporteService,
    private modalCtrl: ModalController,
    public loadingService: LoadingService,
    public popoverController: PopoverController,
    ) { }

  ngOnInit() {
    this.iniciar();
  }

  iniciar(){
    this.refrescar();
  }

  async filtrar(){
    this.modalCtrl.create({
      component: FiltroAporteModalComponent,
      componentProps:{
        filtro:this.filtro,
      }
    }).then((modal) => {
        modal.present();
        modal.onDidDismiss().then(response=>{
          if(response.data){
            this.filtro = response.data;
            this.refrescar();
          }
        });
    });
  }

  async ver(aporte:Aporte){
    this.modalCtrl.create({
      component: VerAporteModalComponent,
      componentProps:{
        item:aporte,
      }
    }).then((modal) => {
        modal.present();
    });
  }

  async refrescar(){
    this.listado = [];
    this.loadingService.setLoading(true);
    this.consultando = true;
    this.aporteService.ajax(this.filtro).subscribe(response=>{
      if(response.items.length>0){
        for(let i = 0; i < response.items.length; i++){
          let item = response.items[i];
          setTimeout(() => {
              this.listado.push(item);
          }, 200*(i+1));
        }
        this.filtro.start = response.items.length;
      }
      this.total = response.total_count;
      this.loadingService.setLoading(false);
      this.consultando = false;
    });
  }

  async limpiar(){
    this.content.scrollToTop(1500);
    this.filtro.start = 0;
    this.total = 0;
    this.refrescar();
  }

  async loadMore(){
    this.loadingService.setLoading(true);
    this.consultando = true;
    this.aporteService.ajax(this.filtro).subscribe(response=>{
      this.filtro.start += response.items.length;
      for(let i = 0; i < response.items.length; i++){
        let item = response.items[i];
        setTimeout(() => {
            this.listado.push(item);
        }, 200*(i+1));
      }
      this.loadingService.setLoading(false);
      this.consultando = false;
    });
  }

  async loadData(event) {
    if (this.filtro.start == this.total) {
      event.target.complete();
      event.target.disabled = true;
      return
    }
    this.loadingService.setLoading(true);
    this.consultando = true;
    this.aporteService.ajax(this.filtro).subscribe(response=>{
      this.filtro.start += response.items.length;
      for(let i = 0; i < response.items.length; i++){
        let item = response.items[i];
        setTimeout(() => {
            this.listado.push(item);
        }, 200*(i+1));
      }
      this.loadingService.setLoading(false);
      this.consultando = false;
      event.target.complete();
    });
  }

  imputado(item:Aporte){
    if(item.aporte>item.total_importe_asignado){
      return 'danger';
    }
    return null;
  }

  async popover(ev: any) {
    const popover = await this.popoverController.create({
        component: PopoverAporteComponent,
        event: ev,
        animated: true,
        showBackdrop: true
    });
    popover.onDidDismiss().then(response=>{
      if(response.data){
        switch(response.data){
          case 1: //refrescar
            this.refrescar();
          break;
          case 2: //filtrar
            this.filtrar();
          break;
        }
      }
    });
    return await popover.present();
  }
}

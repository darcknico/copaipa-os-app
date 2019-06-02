import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll, ModalController, Platform, PopoverController } from '@ionic/angular';
import { Recibo } from 'src/app/_models/recibo';
import { FiltroRecibo, ReciboService } from 'src/app/_services/recibo.service';
import { FiltroReciboModalComponent } from '../filtro-recibo-modal/filtro-recibo-modal.component';
import { LoadingService } from 'src/app/providers/loading.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { Auxiliar } from 'src/app/_helpers/auxiliar';
import { File } from '@ionic-native/file/ngx';
import { PopoverReciboComponent } from '../componentes/popover-recibo/popover-recibo.component';

@Component({
  selector: 'app-listado-recibo',
  templateUrl: './listado-recibo.component.html',
  styleUrls: ['./listado-recibo.component.scss'],
})
export class ListadoReciboComponent implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  listado:Recibo[] = [];
  filtro:FiltroRecibo = {
    start:0,
    length:3,
    fecha_desde:'',
    fecha_hasta:'',
  }
  consultando:boolean = false;
  total:number = 0;
  constructor(
    private service:ReciboService,
    private modalCtrl: ModalController,
    private platform: Platform,
    public loadingService: LoadingService,
    private fileOpener: FileOpener,
    private file: File,
    public popoverController: PopoverController,
    private toast:Toast,
  ) { }

  ngOnInit() {
    this.iniciar();
  }

  iniciar(){
    this.refrescar();
  }

  async filtrar(){
    this.modalCtrl.create({
      component: FiltroReciboModalComponent,
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

  async refrescar(){
    this.listado = [];
    this.loadingService.setLoading(true);
    this.consultando = true;
    this.service.ajax(this.filtro).subscribe(response=>{
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
      this.consultando = false;
      this.loadingService.setLoading(false);
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
    this.service.ajax(this.filtro).subscribe(response=>{
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
    this.service.ajax(this.filtro).subscribe(response=>{
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

  async popover(ev: any) {
    const popover = await this.popoverController.create({
        component: PopoverReciboComponent,
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

  async reporte(item:Recibo){
    this.loadingService.present();

    this.service.reporte(item.id_recibo).subscribe(response=>{
      const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.dataDirectory ;
      console.log('Conviertiendo base64 to PDF');
      this.file.writeFile(writeDirectory, response.filename, Auxiliar.convertBaseb64ToBlob(response.file, 'application/pdf'), {replace: true})
        .then(() => {
            this.loadingService.dismiss();
            console.log('Abriendo pdf');
            this.fileOpener.open(writeDirectory + response.filename, 'application/pdf')
                .catch(() => {
                    console.log('Error opening pdf file');
                });
        })
        .catch(() => {
            console.error('Error writing pdf file');
        });
    },err=>{
      this.loadingService.dismiss();
      console.log("Error en la consulta.",err.error);
    });
  }
}

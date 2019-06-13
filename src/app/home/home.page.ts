import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { NovedadService } from '../_services/novedad.service';
import { DepositoService } from '../providers/deposito.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  consultando = false;
  subscription:any; 

  options: InAppBrowserOptions = {
    location: 'no',
    hidden: 'no',
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'no',
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no',
    closebuttoncaption: 'Cerrar',
    disallowoverscroll: 'yes',
    toolbar: 'no',
    enableViewportScale: 'no',
    allowInlineMediaPlayback: 'no',
    presentationstyle: 'pagesheet',
    fullscreen: 'yes',
    footer: 'no'
  };
  novedades=[];
  constructor(
    private novedadService:NovedadService,
    private platform: Platform,
    private iab: InAppBrowser,
    private navCtrl:NavController,
    private deposito: DepositoService,
  ){

  }

  ngOnInit(): void {
    this.platform.ready().then(res => {
      this.deposito.getItem('novedades')
      .then(
        data => {
          if(data){
            this.novedades = data;
          }
          this.actualizar();
        },
        error => {
          this.actualizar();
        }
      );
      
    });
  }

  link_entry(link){
    const browser = this.iab.create(link,'_self',this.options);
  }

  ver_deudas(){
    this.navCtrl.navigateForward('/deudas');
  }
  ver_aportes(){
    this.navCtrl.navigateForward('/aportes');
  }
  ver_recibos(){
    this.navCtrl.navigateForward('/recibos');
  }

  actualizar(event?){
    if(!event){
      this.consultando = true;
    }
    this.novedadService.getAll().subscribe(response=>{
      this.consultando = false;
      this.novedades = response;
      if(event){
        event.target.complete();
      }
      this.deposito.setItem('novedades', response)
      .then(
        () => console.log('Novedades actualizada'),
        error => console.error('Novedades error', error)
      );
    },()=>{
      this.consultando = false;
    });
  }
}

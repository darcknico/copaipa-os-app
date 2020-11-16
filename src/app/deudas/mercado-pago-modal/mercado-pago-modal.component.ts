import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController, AlertController } from '@ionic/angular';
import { Deuda } from 'src/app/_models/deuda';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagoMercadoPago } from 'src/app/_models/pago.mercadopago';
import { MercadoPagoService } from 'src/app/_services/mercadopago.service';
import { DeudaService } from 'src/app/_services/deuda.service';
import { Afiliado } from 'src/app/_models/afiliado';
import { AuthService } from 'src/app/_services/auth.service';
import { Auxiliar } from 'src/app/_helpers/auxiliar';
import { InAppBrowserOptions, InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-mercado-pago-modal',
  templateUrl: './mercado-pago-modal.component.html',
  styleUrls: ['./mercado-pago-modal.component.scss'],
})
export class MercadoPagoModalComponent implements OnInit {
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
  
  monthNames=Auxiliar.dateTimeMonthNames;
  
  item:Deuda;
  pago:PagoMercadoPago;
  formulario: FormGroup;
  afiliado:Afiliado;

  isLoading:boolean = true;
  onChange:boolean = false;
  constructor(
    private service: MercadoPagoService,
    private deudaService: DeudaService,
    private auth:AuthService,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private alert: AlertController,
    private toast: ToastController,
    private fb: FormBuilder,
    private iab: InAppBrowser,
  ) {
    this.formulario = this.fb.group({
      email:['',[Validators.required,Validators.email,Validators.maxLength(191)]],
    })
  }

  ngOnInit() {
    this.auth.getUsuario().then(item=>{
      this.afiliado = item;
      if(this.afiliado.email){
        this.f.email.setValue(this.afiliado.email);
      }
    })
    this.item = this.navParams.get('item');
    this.actualizar();
  }

  actualizar(){
    this.isLoading = true;
    this.deudaService.obtener(this.item).subscribe(deuda=>{
      this.item = deuda;
      if(this.item.mercadopago){
        this.service.actualizar(this.item.mercadopago.id).subscribe(pago=>{
          this.pago = pago;
          this.isLoading = false;
        },(e)=>{
          this.isLoading = false;
        });
      } else {
        this.pago = null;
        this.isLoading = false;
      }
    },(e)=>{
      this.isLoading = false;
    })
  }

  get f(){
    return this.formulario.controls;
  }
  

  cerrar(){
    if(this.onChange){
      this.modalCtrl.dismiss(this.item);
    } else {
      this.modalCtrl.dismiss(false);
    }
  }

  confirmar(){
    if(!this.formulario.valid){
      return;
    }

    let pago = <PagoMercadoPago>{};
    pago.anio = this.item.anio;
    pago.mes = this.item.mes;
    pago.email = this.f.email.value;

    this.isLoading = true;

    this.service.crearPreferencia(pago).subscribe(response=>{
      this.toast.create({
        message:'Revise su correo para mas informacion del pago',
      })
      this.actualizar();
      this.onChange = true;
    },(e)=>{
      this.isLoading = false;

    });
  }

  async eliminar(){
    const alert = await this.alert.create({
      header: '¿Desea eliminar la preferencia?',
      message: 'Esta por eliminar la preferencia de pago y sus pagos pendientes',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: (blh) => {
            
          }
        }, {
          text: 'ELIMINAR',
          handler: () => {
            this.isLoading = true;
            this.service.eliminar(this.item.mercadopago.id).subscribe(response=>{
              this.onChange = true;
              this.actualizar();
            },()=>{
              this.isLoading = false;
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async mercadopago(){
    const browser = this.iab.create(this.pago.preference_url,'_blank',this.options);
    browser.show();
    browser.on('loadstart').subscribe((e: InAppBrowserEvent) => {
      console.log(e.url);
      if (e && e.url) {
        if (e.url.includes('payment\/success')) {
          this.onChange = true;
          this.toast.create({
            message:'El pago fue aprobado'
          }).then(t=>{
            t.present().then(()=>{});
          });
          browser.close();
          this.actualizar();
        } else if (e.url.includes('payment\/pending')) {
          this.onChange = true;
          this.toast.create({
            message:'El pago esta pendiente'
          }).then(t=>{
            t.present().then(()=>{});
          });
          browser.close();
          this.actualizar();
        } else if (e.url.includes('payment\/failure')) {
          this.onChange = true;
          this.toast.create({
            message:'El pago fue rechazado'
          }).then(t=>{
            t.present().then(()=>{});
          });
          browser.close();
          this.actualizar();
        }
      }
    });
    browser.on('exit').subscribe(event => {
      this.actualizar();
   });
  }

}

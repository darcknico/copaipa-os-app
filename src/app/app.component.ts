import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioService } from './_services/usuario.service';
import { AuthService } from './_services/auth.service';
import { LoadingService } from './providers/loading.service';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Mis datos',
      url: '/pages/perfil',
      icon: 'person',
    },
    {
      title: 'Mis deudas',
      url: '/deudas',
      src: 'assets/icons/debt-icon.svg'
    },
    {
      title: 'Mis aportes',
      url: '/aportes',
      src: 'assets/icons/input-icon.svg'
    },
    {
      title: 'Mis recibos',
      url: '/recibos',
      src: 'assets/icons/bill-icon.svg'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translateService: TranslateService,
    private usuarioService:UsuarioService,
    private authService:AuthService,
    private loadingService:LoadingService,
    private nativeHttp: HTTP,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')){
        this.nativeHttp.setServerTrustMode('pinned')
        .then(() => {
            console.log('SSL Pinning Starts');
        })
        .catch(() => {
          console.log('SSL Pinning Fails');
        });
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.translateService.setDefaultLang('es');
      this.translateService.use('es');

      this.authService.isAuthenticatedPromise().then(res=>{
        if(res){
          this.usuarioService.me().subscribe(response=>{

          });
        }
      });
    });
  }

  salir(){
    this.loadingService.present();
    this.usuarioService.logout().subscribe(response=>{
      this.loadingService.dismiss();
    });
  }


}

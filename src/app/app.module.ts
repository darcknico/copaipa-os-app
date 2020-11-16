import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Toast } from '@ionic-native/toast/ngx';

import { IonicSelectableModule } from 'ionic-selectable';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import es from '@angular/common/locales/es-AR';
registerLocaleData(es);

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpAngularProvider } from './providers/http-angular';
import { HttpNativeProvider } from './providers/http-native';
import { HttpInterceptorProvider } from './providers/http-interceptor';
import { LoadingService } from './providers/loading.service';
import { AlertService } from './providers/alert.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { DepositoService } from './providers/deposito.service';
import { AuthService } from './_services/auth.service';
import { UsuarioService } from './_services/usuario.service';
import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ErrorComponent } from './external/error/error.component';
import { NotFoundComponent } from './external/not-found/not-found.component';
import { IonicStorageModule } from '@ionic/storage';
import { AporteService } from './_services/aporte.service';
import { DeudaService } from './_services/deuda.service';
import { ReciboService } from './_services/recibo.service';
import { NovedadService } from './_services/novedad.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { MercadoPagoService } from './_services/mercadopago.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    NotFoundComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicSelectableModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Platform,
    HTTP,
    HttpAngularProvider,
    HttpNativeProvider,
    AuthService,
    HttpInterceptorProvider,
    LoadingService,
    AlertService,
    FileTransfer,
    FileOpener,
    File,
    DocumentViewer,
    InAppBrowser,
    Toast,
    NativeStorage,
    DepositoService,

    UsuarioService,
    AporteService,
    DeudaService,
    ReciboService,
    NovedadService,
    MercadoPagoService,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import {Injectable} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavController, Platform } from '@ionic/angular';
import { AlertService } from './alert.service';
import { HttpNativeProvider } from './http-native';
import { HttpAngularProvider } from './http-angular';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptorProvider {
    public http: HttpNativeProvider | HttpAngularProvider;

    token:string;

    constructor(
        private authService:AuthService,
        private navController:NavController,
        private alertService:AlertService,
        private platform: Platform,
        private angularHttp: HttpAngularProvider, 
        private nativeHttp: HttpNativeProvider,
        private router: Router
        ) {
            this.http = this.platform.is('cordova') ? this.nativeHttp : this.angularHttp;
            this.authService.getTokenStateObserver().subscribe(response=>{
                this.token = response;
            });
        }

    public get(url: string, params?: any, options: any = {}):Observable<any> {
        options['Content-Type']="application/json";
        return this.http.get(url,params, options,this.token).pipe(
            catchError(err=>this.interceptor(err))
        );
    }

    public post(url: string, params: any, options: any = {}):Observable<any> {
        options['Content-Type']="application/json";
        return this.http.post(url, params, options,this.token).pipe(
            catchError(err=>this.interceptor(err))
        );
    }

    public put(url: string, params: any, options: any = {}):Observable<any> {
        options['Content-Type']="application/json";
        return this.http.put(url, params, options,this.token).pipe(
            catchError(err=>this.interceptor(err))
        );
    }

    public delete(url: string, params?: any, options: any = {}):Observable<any> {
        options['Content-Type']="application/json";
        return this.http.delete(url, params, options,this.token).pipe(
            catchError(err=>this.interceptor(err))
        );
    }

    public interceptor(err){
        console.log(err);
        if(err.status==400){
            this.navController.navigateRoot('home');
            return of([]);
        } else if(err.status==401){
            this.alertService.present(
                'Error',
                null,
                err.error.error,
                ['OK']
            );
            this.authService.logout();
        } else if(err.status==401){
            this.alertService.present(
                'Error',
                null,
                err.error.message,
                ['OK']
            );
        }else if(err.status==504){
            this.alertService.present('Error',null,'Conexion perdida',[]);
        } else if(err.status==500){
            this.alertService.present('Error',null,'Problemas en el sistema',[]);
        } else{
            this.alertService.present('Error',null,'Problemas en el sistema/App',[]);
        }
        return throwError(err);
    }
}
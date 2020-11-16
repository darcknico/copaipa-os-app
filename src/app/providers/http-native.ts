import {Injectable} from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { from, Observable, throwError } from 'rxjs';
import { Auxiliar } from '../_helpers/auxiliar';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Platform } from '@ionic/angular';
@Injectable()
export class HttpNativeProvider {

    constructor(
        private platform: Platform,
        public http: HTTP,
        ) {
        if(this.platform.is('cordova')){
            this.http.setDataSerializer('json');
        }
    }

    public get(url: string, params: any = {}, options: any = {}, token:string = null):Observable<any> {
        this.http.setDataSerializer('json');
        if(!Auxiliar.isNullorUndefined(token)){
            this.http.setHeader('*','Authorization',token);
        }
        let responseData = this.http.get(url, params,options)
            .then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data));

        return from(responseData).pipe(
            catchError(this.parseErrar)
        );
    }

    public delete(url: string, params?: any, options: any = {}, token:string = null):Observable<any> {
        this.http.setDataSerializer('json');
        if(!Auxiliar.isNullorUndefined(token)){
            this.http.setHeader('*','Authorization',token);
        }
        let responseData = this.http.delete(url, params, options)
            .then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data));

        return from(responseData).pipe(
            catchError(this.parseErrar)
        );
    }

    public post(url:string, params: any, options: any = {}, token:string = null):Observable<any> {
        this.http.setDataSerializer('json');
        if(!Auxiliar.isNullorUndefined(token)){
            this.http.setHeader('*','Authorization',token);
        }
        let responseData = this.http.post(url, params, options)
            .then(resp => {
                if(options.responseType == 'text' || options.responseType == 'blob'){
                    return resp.data;
                } else {
                    return JSON.parse(resp.data);
                }
            });

        return from(responseData).pipe(
            catchError(this.parseErrar)
        );
    }

    public put(url:string, params: any, options: any = {}, token:string = null):Observable<any> {
        this.http.setDataSerializer('json');
        if(!Auxiliar.isNullorUndefined(token)){
            this.http.setHeader('*','Authorization',token);
        }
        let responseData = this.http.put(url, params, options)
            .then(resp => {
                if(options.responseType == 'text' || options.responseType == 'blob'){
                    return resp.data;
                } else {
                    return JSON.parse(resp.data);
                }
            });

        return from(responseData).pipe(
            catchError(this.parseErrar)
        );
    }

    private parseErrar(err){
        if(err.error){
            err.error = JSON.parse(err.error);
        }
        return throwError(err);
    }
}
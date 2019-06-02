import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auxiliar } from '../_helpers/auxiliar';
import { HttpInterceptorProvider } from '../providers/http-interceptor';
import { Recibo } from '../_models/recibo';

export interface FiltroRecibo{
    length:number;
    start:number;
    fecha_desde:string;
    fecha_hasta:string;
}
export interface ReciboAjax{
    items:Recibo,
    total_count:number;
}
@Injectable({
  providedIn: 'root'
})
export class ReciboService {
    private base_path = environment.base_path + 'recibos';

    constructor(
        private http:HttpInterceptorProvider,
    ) { 

    }

    public getAll(){
        return this.http.get(this.base_path,{});
    }

    public ajax(filtro:FiltroRecibo){
        return this.http.get(this.base_path,
            Auxiliar.toParams(filtro)
        );
    }

    public reporte(id_recibo){
        return this.http.post([this.base_path,id_recibo,'reporte'].join('/'),{});
    }

}
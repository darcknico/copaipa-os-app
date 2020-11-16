import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auxiliar } from '../_helpers/auxiliar';
import { HttpInterceptorProvider } from '../providers/http-interceptor';
import { Deuda } from '../_models/deuda';

export interface FiltroDeuda{
    length:number;
    start:number;
    fecha_desde:string;
    fecha_hasta:string;
}
export interface DeudaAjax{
    items:Deuda,
    total_count:number;
}
@Injectable({
  providedIn: 'root'
})
export class DeudaService {
    private base_path = environment.base_path + 'deudas';

    constructor(
        private http:HttpInterceptorProvider,
    ) { 

    }

    public getAll(){
        return this.http.get(this.base_path,{});
    }

    public ajax(filtro:FiltroDeuda){
        return this.http.get(this.base_path,
            Auxiliar.toParams(filtro)
        );
    }

    /**
     * 
     * @param item Deuda
     */
    public obtener(item:Deuda){
        return this.http.post(this.base_path+'/obtener',item);
    }

    /**
     * 
     * @param item Deuda
     */
    public ultimo(){
        return this.http.get(this.base_path+'/ultimo');
    }
}
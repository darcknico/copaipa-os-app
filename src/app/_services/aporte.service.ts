import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auxiliar } from '../_helpers/auxiliar';
import { HttpInterceptorProvider } from '../providers/http-interceptor';
import { Aporte } from '../_models/aporte';

export interface FiltroAporte{
    length:number;
    start:number;
    fecha_desde:string;
    fecha_hasta:string;
}
export interface AporteAjax{
    items:Aporte,
    total_count:number;
}
@Injectable({
  providedIn: 'root'
})
export class AporteService {
    private base_path = environment.base_path + 'aportes';

    constructor(
        private http:HttpInterceptorProvider,
    ) { 

    }

    public getAll(){
        return this.http.get(this.base_path,{});
    }

    public ajax(filtro:FiltroAporte){
        return this.http.get(this.base_path,
            Auxiliar.toParams(filtro)
        );
    }

}
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpInterceptorProvider } from '../providers/http-interceptor';
import { PagoMercadoPago } from '../_models/pago.mercadopago';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {
    private base_path = environment.base_path + 'mercadopago';

    constructor(
        private http:HttpInterceptorProvider,
    ) { 

    }

    public crearPreferencia(item:PagoMercadoPago){
        return this.http.post(this.base_path,item);
    }

    /**
     * 
     * @param id_pago_mercado_pago 
     */
    public actualizar(id_pago_mercado_pago:number){
        return this.http.get(this.base_path+'/'+id_pago_mercado_pago);
    }

    public eliminar(id_pago_mercado_pago:number){
        return this.http.delete(this.base_path+'/'+id_pago_mercado_pago);
    }
}
import { PagoMercadoPago } from './pago.mercadopago';

export interface Deuda{
    id_afiliado:number;
    anio:number;
    mes:number;
    importe:number;
    cobrado:number;
    tipo:string;
    interes:number;

    mercadopago:PagoMercadoPago;
    a_pagar:number;
}
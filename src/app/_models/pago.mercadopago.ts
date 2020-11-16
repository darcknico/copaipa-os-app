export interface PagoMercadoPago{
    id:number;
    id_afiliado:number;
    anio:number;
    mes:number;
    importe_pagado:number;
    fecha_pago:number;
    preference_id:string;
    payment_id:number;
    payment_status:number;

    email:string;
    preference_url:string;
}
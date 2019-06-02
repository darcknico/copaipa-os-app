export interface Aporte{
    id_afiliado:number;
    id_recibo:number;
    cuotas_impactadas:string;
    detalles:CuotaImpactada[];
    total_importe_asignado:number;
    fecha:string;
    aporte:number;
}

export interface CuotaImpactada{
    mes:number;
    anio:number;
    importe:number;
}
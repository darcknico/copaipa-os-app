import * as moment from 'moment';

export const dateFormats = {
    isoFormat: 'YYYY-MM-DDTHH:mm:ss', // Corresponds to '2016-01-04T13:00:00Z'
    oracleFormat: 'YYYY-MM-DD HH:mm:ss',
    format: 'YYYY-MM-DD',
 }

export class Auxiliar {
    public static convertBaseb64ToBlob(b64Data, contentType): Blob {
        contentType = contentType || '';
        const sliceSize = 512;
        b64Data = b64Data.replace(/^[^,]+,/, '');
        b64Data = b64Data.replace(/\s/g, '');
        const byteCharacters = window.atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
             const slice = byteCharacters.slice(offset, offset + sliceSize);
             const byteNumbers = new Array(slice.length);
             for (let i = 0; i < slice.length; i++) {
                 byteNumbers[i] = slice.charCodeAt(i);
             }
             const byteArray = new Uint8Array(byteNumbers);
             byteArrays.push(byteArray);
        }
       return new Blob(byteArrays, {type: contentType});
    }

    public static toParams(modelo){
        let obj = {};
        for(let key in modelo){
            obj[key] = String(modelo[key]);
        }
        return obj;
    }

    public static isNullorUndefined(x):boolean{
        if (x == null) {
            return true;
        }
    
        if (x === null) {
            return true;
        }
    
        if (typeof x === 'undefined') {
            return true;
        }
        return false;
    }

    public static toDate(value: string,
        /**
         * The default has *all* the formats
         *  - This is because strict date type validations
         *  - are done by passing in explicit limited sets.
         **/
        formats = [
          dateFormats.oracleFormat,
          //dateFormats.isoFormat,
          dateFormats.format,
        ]
        ): { valid: boolean, date: Date | null } {
        if (!value || !value.trim().length) {
          return { valid: true, date: null };
        }
        let trimmed = value.trim();
        if (!formats.some(format => format.length == trimmed.length)) {
          return { valid: false, date: null };
        }
        // http://momentjs.com/docs/#/parsing/string-formats/
        let date = moment(value, formats, true);
        if (!date.isValid()) {
          return { valid: false, date: null };
        }
        return { valid: true, date: date.toDate() };
    }
    
    public static dateTimeMonthNames:string[] = ["Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
}
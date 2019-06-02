import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpInterceptorProvider } from '../providers/http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  private base_path = environment.base_path + 'novedades';
  constructor(
    private http: HttpInterceptorProvider) {
        
  }

  getAll(){
    return this.http.get(this.base_path,{},{});
  }

}

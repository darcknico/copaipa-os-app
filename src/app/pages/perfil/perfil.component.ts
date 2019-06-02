import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  usuario:any;
  loading:boolean = false;

  constructor(
    private authService: AuthService,
    private usuarioService:UsuarioService,
  ) { 
    this.usuario = this.authService.user$.pipe(
      map(usuario=>{
        if(usuario){
          usuario.lista = this.beneficiarios(usuario.beneficiarios);
        }
        return usuario;
      })
    );
  }

  ngOnInit() {
    this.loading = true;
    this.usuarioService.me().subscribe(res=>{
      this.loading = false;
    });
  }

  beneficiarios(linea:string):any[]{
    let lista = null;
    if(linea.length>0){
      lista = [];
      let beneficiarios = linea.split(',');
      beneficiarios.forEach(item=>{
        let tipo = item.split(' ');
        if(tipo.length>1){
          lista.push({
            cantidad:tipo[0],
            tipo:tipo[1],
          });
        }
      });
    }
    return lista;
  }

}

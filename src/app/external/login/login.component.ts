import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/providers/loading.service';
import { AlertService } from 'src/app/providers/alert.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UsuarioService } from 'src/app/_services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

	passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  cuenta:AbstractControl;
  password:AbstractControl;

  constructor(
    private navController:NavController,
    private authService:AuthService,
    private service:UsuarioService,
    private loadingService: LoadingService,
    private formBuilder: FormBuilder,
    private menuController:MenuController,
    private alertService:AlertService,
  ) { 
    this.loginForm = this.formBuilder.group({
			cuenta : ['', [Validators.required] ],
			password : ['', [Validators.required] ],
    });
    
    this.cuenta= this.f.cuenta;
    this.password= this.f.password;
  }

  get f(){
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.menuController.enable(false);
    this.loadingService.present();
    this.authService.isAuthenticatedPromise().then(response=>{
      this.loadingService.dismiss();
      if(response){
        this.menuController.enable(true);
        this.navController.navigateRoot('home');
      }
    });
  }

  async onLogin() {
		if(!this.loginForm.valid){
			return false;
    }
    let cuenta = this.f.cuenta.value;
    let password = this.f.password.value;
    this.loadingService.present();
    this.service.login(cuenta,password).subscribe(response=>{
      this.loadingService.dismiss();
      this.menuController.enable(true);
    },(err)=>{
      this.loadingService.dismiss();
    });
		
	}

	hideShowPassword() {
		this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
		this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
	}
  /*
  register(){
    this.router.navigate(['external','register']);
  }

  recovery(){
    this.router.navigate(['external','recovery']);
  }
  */
}

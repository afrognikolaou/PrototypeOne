import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { AuthData } from '../../providers/auth-data/auth-data';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { NotAuthPage } from '../not-auth/not-auth';
import { ResetPasswordPage } from '../reset-password/reset-password';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthData]
})
export class LoginPage {
	public loginForm: any;

	constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,  public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

		this.loginForm = formBuilder.group({
			email: ['', Validators.required],
			password: ['',Validators.required]
		})

	}

	loginUser(){
 
      	this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => 
      	{
        	firebase.auth().onAuthStateChanged((user) => {
				if (user) 
				{
					if (user.emailVerified)
					{
						this.nav.setRoot(HomePage);
					}else 
					{
						this.nav.setRoot(NotAuthPage);
					}
				} 
				else 
				{
					console.log('Did nothing');
				}
			});
      	}, error => {

      		var errorMessage: string = "The username or password are incorrect. Please try again.";

          	let alert = this.alertCtrl.create({
            	message: errorMessage,
	            buttons: [
	              {
	                text: "Ok",
	                role: 'cancel'
	              }
	            ]
          	});

          	alert.present();

	      });
  	}

	goToSignup(){
	  this.nav.push(SignupPage);
	}

	goToResetPassword(){
	  this.nav.push(ResetPasswordPage);
	}

}

import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { AuthData } from '../../providers/auth-data/auth-data';
import { LoginPage } from '../login/login';
import { NotAuthPage } from '../not-auth/not-auth';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'build/pages/signup/signup.html',
  providers: [AuthData]
})
export class SignupPage {
	public signupForm: ControlGroup;
	public fireAuth: any;

	constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
		this.fireAuth = firebase.auth();
		this.signupForm = formBuilder.group({
			email: [''],
			password: ['']
		})
	}

	signupUser(){
		this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password).then(() => 
		{
			this.fireAuth.onAuthStateChanged(function(user) 
			{
				user.sendEmailVerification();
			});

			this.nav.setRoot(NotAuthPage);

		}, (error) => 
		{
			var errorMessage: string = error.message;
			let alert = this.alertCtrl.create(
			{
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
}

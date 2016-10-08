import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data/auth-data';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/not-auth/not-auth.html',
  providers: [AuthData]
})
export class NotAuthPage 
{
	public fireAuth: any;
	
	constructor(private navCtrl: NavController, public authData: AuthData, public alertCtrl: AlertController) 
	{

	}

	goToLogin() {
	this.authData.logoutUser().then(() => 
	{
		this.navCtrl.setRoot(LoginPage);
	}, (error) =>
	{
		var errorMessage: string = error.message;
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
}

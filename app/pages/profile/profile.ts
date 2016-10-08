import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ProfileData } from '../../providers/profile-data/profile-data';
import { AuthData } from '../../providers/auth-data/auth-data';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [ProfileData, AuthData]
})

export class ProfilePage
{
  public userProfile: any;
  public birthDate: string;

  constructor(private navCtrl: NavController, public profileData: ProfileData, public authData: AuthData, public alertCtrl: AlertController)
  {
    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });
  }

  goBack()
  {
    this.navCtrl.pop();
  }

  updateName()
  {
    let alert = this.alertCtrl.create({
      message: "Your first name & last name",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate)
  {
    this.profileData.updateDOB(birthDate);
  }

  changePass(){
		this.authData.resetPassword(this.userProfile.email).then((user) => {
			let alert = this.alertCtrl.create({
				message: "We just sent you a change password link to your email",
				buttons: [
					{
						text: "Ok",
						role: 'cancel',
						handler: () => {
							this.authData.logoutUser();
						}
					}
				]
			});
			alert.present();
		}, (error) => {
			var errorMessage: string = error.message;
			let errorAlert = this.alertCtrl.create({
				message: errorMessage,
				buttons: [
					{
						text: "Ok",
						role: 'cancel'
					}
				]
			});

			errorAlert.present();
		});
	}
}

import { Component } from '@angular/core';
import { NavController, ViewController} from 'ionic-angular';
import { ProfileData } from '../../providers/profile-data/profile-data';
import { AuthData } from '../../providers/auth-data/auth-data';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/my-pop-over/my-pop-over.html',
  providers: [ AuthData, ProfileData]
})
export class MyPopOverPage
{

  constructor(private navCtrl: NavController, public authData: AuthData, public profileData: ProfileData, public viewCtrl: ViewController) {

  }

  goToProfile()
  {
    this.viewCtrl.dismiss();
  	this.navCtrl.setRoot(ProfilePage);
  }

  logout()
  {
    this.viewCtrl.dismiss();
    this.authData.logoutUser();
  }
}

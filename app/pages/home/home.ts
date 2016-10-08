import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController } from 'ionic-angular';
import { ProfileData } from '../../providers/profile-data/profile-data';
import { AuthData } from '../../providers/auth-data/auth-data';
import { ProfilePage } from '../profile/profile';
import { MyPopOverPage } from '../my-pop-over/my-pop-over';
import { DringMenuPage } from '../dring-menu/dring-menu';
import { Camera } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [ProfileData, AuthData]
})

export class HomePage
{
  public userProfile: any;
  public birthDate: string;
  public pictureToAdd: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public popoverCtrl: PopoverController, public authData: AuthData, public profileData: ProfileData)
  {
    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });
  }

  presentPopOver(ev)
  {
    let popover = this.popoverCtrl.create(MyPopOverPage);
    popover.present({
      ev: ev
    });
  }

  openMenuPage()
  {
    this.navCtrl.setRoot(DringMenuPage);
  }
  
}

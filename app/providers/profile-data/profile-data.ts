import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class ProfileData
{
  public userProfile: any;
  public currentUser: any;

  constructor()
  {
    this.currentUser = firebase.auth().currentUser;
    this.userProfile = firebase.database().ref('/userProfile');
  }

  getUserProfile(): any
  {
    return this.userProfile.child(this.currentUser.uid);
  }

  updateName(firstName: string, lastName: string): any
  {
    return this.userProfile.child(this.currentUser.uid).update({
      firstName: firstName,
      lastName: lastName,
    });
  }

  updateDOB(birthDate: string): any
  {
    return this.userProfile.child(this.currentUser.uid).update({
      birthDate: birthDate,
    });
  }
}

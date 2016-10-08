import { Component } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from './pages/tabs/tabs';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { NotAuthPage } from './pages/not-auth/not-auth';
import * as firebase from 'firebase';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(public platform: Platform) {

  	// Initialize Firebase
	var config = {
	apiKey: "AIzaSyAZriLTZZkD1gWgFsgdk8kueZgmUd1Tmro",
	authDomain: "fb-auth-e8aed.firebaseapp.com",
	databaseURL: "https://fb-auth-e8aed.firebaseio.com",
	storageBucket: "fb-auth-e8aed.appspot.com",
	messagingSenderId: "227217051164"
	};
	firebase.initializeApp(config);

	firebase.auth().onAuthStateChanged((user) => {
		if (user)
		{
			if (user.emailVerified)
			{
				this.rootPage = TabsPage;
			}else
			{
				this.rootPage = NotAuthPage;
			}
		}
		else
		{
			//If there is no user logged in send him to the LoginPage
			this.rootPage = LoginPage;
		}
	});

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [], {
  tabsPlacement: 'bottom'
});

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { EventListPage } from '../event-list/event-list';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
})
export class TabsPage {
  public tabOne: any;
  public tabTwo: any;
  public tabThree: any;

  constructor(private navCtrl: NavController)
  {
      this.tabOne = HomePage;
      this.tabTwo = EventListPage;
      this.tabThree = ProfilePage;
  }
}

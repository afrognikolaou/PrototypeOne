import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventCreatePage } from '../event-create/event-create';
import { EventDetailPage } from '../event-detail/event-detail';
import { EventData } from '../../providers/event-data/event-data';

@Component({
  templateUrl: 'build/pages/event-list/event-list.html',
  providers: [EventData]
})
export class EventListPage
{
  public eventList: any;

  constructor(private navCtrl: NavController, public eventData: EventData)
  {
    this.navCtrl = navCtrl;
    this.eventData = eventData;

    this.eventData.getEventList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach(snap => {
        rawList.push({
          id: snap.key,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date,
          revenue: snap.val().revenue,
        });
      });
      this.eventList = rawList;
    });
  }

  goToCreate()
  {
    this.navCtrl.push(EventCreatePage);
  }

  goToEventDetail(eventId)
  {
    this.navCtrl.push(EventDetailPage, {
      eventId: eventId,
    });
  }
}

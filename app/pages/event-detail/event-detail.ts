import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventData } from '../../providers/event-data/event-data';
import { Camera } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/event-detail/event-detail.html',
  providers: [EventData]
})
export class EventDetailPage
{
  public currentEvent: any;
  public guestName: string = '';
  public guestPicture: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private eventData: EventData)
  {
    this.navParams = navParams;
    this.eventData.getEventDetail(this.navParams.get('eventId')).on('value', (snapshot) => {
      this.currentEvent = snapshot.val();
    });

  }

  addGuest(guestName)
  {
    this.eventData.addGuest(guestName, this.currentEvent.id, this.currentEvent.price, this.guestPicture).then(() => {
      this.guestName = '';
      this.guestPicture = null;
    });
  }

  takePicture()
  {
    Camera.getPicture({
      quality: 95,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.guestPicture = imageData;

    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

}

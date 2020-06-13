import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../../services/dataShareService';


@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {

  public lat = 24.799448; // initial map load data
  public lng = 120.979021; // initial map load data

  public origin = { lat: null, lng: null };
  public destination = { lat: null, lng: null };

  waypoints = [];

  constructor(public shareService: DataShareService) {
    const list = this.shareService.getWayPoints();
    if (list && list.length !== 0) {
      const origin = list[0];
      const destination = list[list.length - 1];
      this.origin = { lat: origin.nlat, lng: origin.nlong };
      this.destination = { lat: destination.nlat, lng: destination.nlong };
      list.shift();
      list.pop();

      if (list.length !== 0) {
        list.forEach((element) => {
          this.waypoints.push({ location: { lat: element.nlat, lng: element.nlong } });
        });
      }
    }
  }

  ngOnInit() { }

}

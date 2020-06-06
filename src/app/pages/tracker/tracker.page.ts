import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Directions {
  origin: {
    lat: number;
    lng: number;
  };
  destination: {
    lat: number;
    lng: number;
  };
}

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {

  public lat = 24.799448; // initial map load data
  public lng = 120.979021; // initial map load data
  public directions: Directions;

  orderData: any;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.orderData = JSON.parse(params.data);
        this.directions = this.orderData.directions;
      }
    });
  }

  ngOnInit() {
  }

/*   getDirection() {
    this.origin = { lat: 24.799448, lng: 120.979021 };
    this.destination = { lat: 24.799524, lng: 120.975017 };
  } */

}

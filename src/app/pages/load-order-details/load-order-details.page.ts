import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../../services/dataShareService';

@Component({
  selector: 'app-load-order-details',
  templateUrl: './load-order-details.page.html',
  styleUrls: ['./load-order-details.page.scss'],
})
export class LoadOrderDetailsPage implements OnInit {

  orderLoads: any;

  constructor(public shareService: DataShareService) {
    if (this.shareService.getDataOrderLoads()) {
      this.orderLoads = this.shareService.getDataOrderLoads();
    }
  }

  ngOnInit() {
  }

}

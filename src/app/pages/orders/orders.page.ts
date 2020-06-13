import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form-service.service';
import { LoadingService } from '../../services/loading.service';
import { Router } from '@angular/router';
import { DataShareService } from '../../services/dataShareService';

export interface IOrders {
  norderid: number;
  saddresspickup: string;
  saddressdrop: string;
  dtorderedon: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  clientOrders: IOrders[];
  loginName: string;

  constructor(
    public auth: AuthService,
    public route: ActivatedRoute,
    public formService: FormService,
    public loadingService: LoadingService,
    public router: Router,
    public shareService: DataShareService,
    ) {}

  async getOrders() {
    this.loadingService.present();
    const token = localStorage.getItem('ACCESS_TOKEN');
    const clientId = localStorage.getItem('nclientid');
    this.formService.getOrders(parseInt(clientId, 10), token).subscribe((data) => {
      this.clientOrders = data;
      this.loadingService.dismiss();
    }, (error) => {
      console.log(error);
      this.loadingService.dismiss();
    });
  }

  async getLoadsAvailable() {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const shipperId = localStorage.getItem('nshipperid');
    // this.formService.getLoadsAvailable(token) // TODO: get all loads available
    this.formService.getShipperLoads(parseInt(shipperId, 10), token).subscribe((loads) => {
      this.clientOrders = loads;
    }, (error) => {
      console.log(error);
      this.loadingService.dismiss();
    });
  }

  async getOrderLoads(orderId: number) {
      const token = localStorage.getItem('ACCESS_TOKEN');
      this.loadingService.present();
      this.formService.getOrderDetails(orderId, token).subscribe(([data, wayPoints]) => {
        this.loadingService.dismiss();
        if (data.length !== 0 && wayPoints.length !== 0) {
          this.shareService.setDataOrderLoads(data);
          this.shareService.setWayPoints(wayPoints);
          this.router.navigate(['/load-order-details']);
        }
      }, (error) => {
        this.loadingService.dismiss();
      });
  }

  ngOnInit() {
    this.loginName = this.shareService.getLoginDetails();
    if (this.loginName === 'clientlogin') {
      this.getOrders();
    } else {
      this.getLoadsAvailable();
    }
  }

}

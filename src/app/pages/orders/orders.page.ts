import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form-service.service';
import { LoadingService } from '../../services/loading.service';
import { Router } from '@angular/router';
import { DataShareService } from '../../services/dataShareService';
import { AlertController } from '@ionic/angular';

export interface IOrders {
  norderid: number;
  saddresspickup: string;
  saddressdrop: string;
  dtorderedon: string;
  nloadid?: number;
  fisconnecting?: string;
  dtpickupdate?: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  clientOrders: IOrders[];

  assignedOrders: IOrders[] = [];
  transitOrders: IOrders[] = [];
  completedOrders: IOrders[] = [];
  shipperAvailableOrders: IOrders[] = [];

  segmentModel = 'orders';

  loginName: string;

  constructor(
    public auth: AuthService,
    public route: ActivatedRoute,
    public formService: FormService,
    public loadingService: LoadingService,
    public router: Router,
    public shareService: DataShareService,
    public alertCtrl: AlertController
    ) {}

    // display client orders
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

  // get shipper available loads
  async getShipperLoadsAvailable() {
    this.loadingService.present();
    const token = localStorage.getItem('ACCESS_TOKEN');
    this.formService.getLoadsAvailable(token).subscribe((loads) => {
      this.loadingService.dismiss();
      this.shipperAvailableOrders = loads;
    }, (error) => {
      console.log(error);
      this.loadingService.dismiss();
    });
  }

  async getShipLoads() {
    this.loadingService.present();
    const token = localStorage.getItem('ACCESS_TOKEN');
    const shipperId = localStorage.getItem('nshipperid');
    this.formService.getShipperLoads(parseInt(shipperId, 10), token).subscribe((loads) => {
      this.loadingService.dismiss();
      if (loads && loads.length !== 0) {
        this.assignedOrders = loads.filter((load) => {
          if (load.sstatusid) {
            return load.sstatusid === '2001';

          }
        });

        this.transitOrders = loads.filter((load) => {
          if (load.sstatusid) {
            return load.sstatusid === '2002';

          }
        });

        this.completedOrders = loads.filter((load) => {
          if (load.sstatusid) {
            return load.sstatusid === '2003';
          }
        });
      }
    }, (error) => {
      console.log(error);
      this.loadingService.dismiss();
    });
  }

  async acceptDeliveryDone(loadId: number) {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const data = {
      NLOADID: loadId,
      NSHIPPERID: parseInt(localStorage.getItem('nshipperid'), 10)
    };

    this.formService.acceptDelivery(data, token).subscribe((res) => {
      this.showAlert('Success', res.info);
      this.loadingService.dismiss();
    }, (error) => {
      this.loadingService.dismiss();
      console.log(error);
    });
  }

  // get client order load details
  async getOrderLoadDetails(orderId: number) {
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

  async shipperLoadAcceptDetails(data: any) {
    const setData = { origin: { lat: data.npickuplat, lng: data.npickuplong }, destination: { lat: data.ndroplat, lng: data.ndroplong } };
    this.shareService.setDataOrderLoads(data);
    this.shareService.setOriginDestinationCoords(setData);
    this.router.navigate(['/load-order-details']);
  }

  changeSegmentTab() {
    this.segmentModel = 'orders';
  }

  async refreshOrders() {
    if (this.loginName && this.loginName === 'clientlogin') {
      this.getOrders();
    }

    if (this.loginName && this.loginName === 'shipperlogin') {
      this.getShipLoads();
      this.getShipperLoadsAvailable();
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    this.loginName = this.shareService.getLoginDetails();
    if (this.loginName === 'clientlogin') {
      this.getOrders();
    } else {
      this.getShipperLoadsAvailable();
      this.getShipLoads();
    }
  }

}

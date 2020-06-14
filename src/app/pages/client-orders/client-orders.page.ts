import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form-service.service';
import { LoadingService } from '../../services/loading.service';
import { Router } from '@angular/router';
import { DataShareService } from '../../services/dataShareService';
import { AlertController } from '@ionic/angular';
import { SubSink } from 'subsink';

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
  templateUrl: './client-orders.page.html',
  styleUrls: ['./client-orders.page.scss'],
})
export class ClientOrdersPage implements OnInit, OnDestroy {

  clientOrders: IOrders[];

  assignedOrders: IOrders[] = [];
  transitOrders: IOrders[] = [];
  completedOrders: IOrders[] = [];
  shipperAvailableOrders: IOrders[] = [];

  segmentModel = 'orders';

  loginName: string;

  subs = new SubSink();

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
    this.subs.sink = this.formService.getOrders(parseInt(clientId, 10), token).subscribe((data) => {
      this.clientOrders = data;
      this.loadingService.dismiss();
    }, (error) => {
      console.log(error);
      this.loadingService.dismiss();
    });
  }

  // get client order load details
  async getOrderLoadDetails(orderId: number) {
      const token = localStorage.getItem('ACCESS_TOKEN');
      this.loadingService.present();
      this.subs.sink = this.formService.getOrderDetails(orderId, token).subscribe(([data, wayPoints]) => {
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

  async refreshOrders() {
    this.getOrders();
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
    this.getOrders();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}

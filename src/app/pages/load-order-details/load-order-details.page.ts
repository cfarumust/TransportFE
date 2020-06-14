import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataShareService } from '../../services/dataShareService';
import { LoadingService } from '../../services/loading.service';
import { FormService } from '../../services/form-service.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-load-order-details',
  templateUrl: './load-order-details.page.html',
  styleUrls: ['./load-order-details.page.scss'],
})
export class LoadOrderDetailsPage implements OnInit, OnDestroy {

  orderLoads: any;
  loginName = '';
  subs = new SubSink();

  constructor(
    public shareService: DataShareService,
    public loadingService: LoadingService,
    public formService: FormService,
    public alertCtrl: AlertController,
    public router: Router,
    ) {
    this.loginName = this.shareService.getLoginDetails();
    this.orderLoads = this.shareService.getDataOrderLoads();
  }

  async acceptOrder(loadId: number) {
    this.loadingService.present();
    const token = localStorage.getItem('ACCESS_TOKEN');
    const data = {
      NLOADID: loadId,
      NSHIPPERID: parseInt(localStorage.getItem('nshipperid'), 10)
    };

    this.subs.sink = this.formService.assignToLoad(data, token).subscribe((res) => {
      this.showAlert('Success', res.info);
      this.loadingService.dismiss();
      const navId = this.loginName === 'clientlogin' ? '/client-orders' : '/shipper-orders';
      this.router.navigate([navId]);
    }, (error) => {
      this.loadingService.dismiss();
      console.log(error);
    });
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
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}

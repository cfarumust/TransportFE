import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../../services/dataShareService';
import { LoadingService } from '../../services/loading.service';
import { FormService } from '../../services/form-service.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load-order-details',
  templateUrl: './load-order-details.page.html',
  styleUrls: ['./load-order-details.page.scss'],
})
export class LoadOrderDetailsPage implements OnInit {

  orderLoads: any;
  loginName = '';

  constructor(
    public shareService: DataShareService,
    public loadingService: LoadingService,
    public formService: FormService,
    public alertCtrl: AlertController,
    public router: Router,
    ) {
    this.loginName = this.shareService.getLoginDetails();
    this.orderLoads = this.shareService.getDataOrderLoads();
    console.log(this.orderLoads);
  }

  async acceptOrder(loadId: number) {
    this.loadingService.present();
    const token = localStorage.getItem('ACCESS_TOKEN');
    const data = {
      NLOADID: loadId,
      NSHIPPERID: parseInt(localStorage.getItem('nshipperid'), 10)
    };

    this.formService.assignToLoad(data, token).subscribe((res) => {
      this.showAlert('Success', res.info);
      this.loadingService.dismiss();
      this.router.navigate(['/orders']);
      console.log(res);
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

}

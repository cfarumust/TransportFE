import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { signupConfig } from './signup.config';
import { AuthService } from '../../services/auth.service';
import { DataShareService } from '../../services/dataShareService';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit, OnDestroy {

  constructor(
    public auth: AuthService,
    public dataShareService: DataShareService,
    public alertCtrl: AlertController,
    public router: Router,
    public loadingService: LoadingService,
    ) { }

  homeIcon = '../../assets/images/shipping_icon.png';
  form = new FormGroup({});
  model = { };
  fields: FormlyFieldConfig[] = signupConfig;

  subs = new SubSink();

  onSubmit() {
    if (this.form.valid) {
      this.loadingService.present();
      if (this.model['SPASSWORD']) {
        this.model['SPASSWORD'] = this.model['SPASSWORD'].password;
      }
      const loginName = this.dataShareService.getLoginDetails();
      this.subs.sink = this.auth.register(this.model, loginName).subscribe((res) => {
        if (res && res.success) {
          this.loadingService.dismiss();
          this.showAlert('Success', res.info);
          this.router.navigate(['/login']);
        } else {
          if (res && res.usernameexists) {
            this.loadingService.dismiss();
            this.showAlert('Fail', res.info);
          }
        }
      }, (error) => {
        this.loadingService.dismiss();
        this.showAlert('Fail', 'Something went wrong, please try again later');
        console.log(error);
      });
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
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}

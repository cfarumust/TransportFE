import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { loginConfig } from './login.config';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Router } from '@angular/router';
import { FormService } from '../../services/form-service.service';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private router: Router, public formService: FormService, public auth: AuthService, public alertCtrl: AlertController) { }

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = loginConfig;
  homeIcon = '../../assets/images/shipping_icon.png';

  login() {
    if (this.form.valid) {
      this.auth.login(this.model).subscribe(async res => {
        if (res.success) {
          this.router.navigateByUrl('/set-order');
        } else {
          this.showAlert('Login Failed', 'Wrong Credentials');
        }
      }, async (error) => {
        this.showAlert('Unexpected Error', 'Please try again after some time');
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

}

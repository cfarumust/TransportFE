import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { signupConfig } from './signup.config';
import { AuthService } from '../../services/auth.service';
import { DataShareService } from '../../services/dataShareService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(public auth: AuthService, public dataShareService: DataShareService) { }

  homeIcon = '../../assets/images/shipping_icon.png';
  form = new FormGroup({});
  model = { };
  fields: FormlyFieldConfig[] = signupConfig;

  onSubmit() {
    if (this.form.valid) {
      this.model['SPASSWORD'] = this.model['SPASSWORD'].password;
      const loginName = this.dataShareService.getLoginDetails();
      this.auth.register(this.model, loginName).subscribe((data) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      });
    }
  }


  ngOnInit() {
  }

}

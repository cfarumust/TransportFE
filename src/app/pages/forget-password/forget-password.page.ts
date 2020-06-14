import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { forgetPasswordConfig } from './forget-password.config';
import { Router} from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  constructor(private router: Router) { }

  homeIcon = '../../assets/images/shipping_icon.png';
  form = new FormGroup({});
  model = { };
  fields: FormlyFieldConfig[] = forgetPasswordConfig;

  onSubmit() {
    if (this.model) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

}

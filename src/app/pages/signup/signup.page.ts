import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { signupConfig } from './signup.config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor() { }

  homeIcon = '../../assets/images/shipping_icon.png';
  form = new FormGroup({});
  model = { };
  fields: FormlyFieldConfig[] = signupConfig;

  onSubmit() {
    console.log(this.model);
  }


  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../../services/dataShareService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public dataShareService: DataShareService, public router: Router) { }

  homeIcon = '../../assets/images/shipping_icon.png';

  ngOnInit() {
  }

  login(loginName: string) {
    this.dataShareService.setLoginDetails(loginName);
    this.router.navigate(['/login']);
  }

}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShipperOrdersPage } from './shipper-orders.page';

describe('ShipperOrdersPage', () => {
  let component: ShipperOrdersPage;
  let fixture: ComponentFixture<ShipperOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipperOrdersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShipperOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

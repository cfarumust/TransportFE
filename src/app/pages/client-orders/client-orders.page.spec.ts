import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientOrdersPage } from './client-orders.page';

describe('ClientOrdersPage', () => {
  let component: ClientOrdersPage;
  let fixture: ComponentFixture<ClientOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientOrdersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

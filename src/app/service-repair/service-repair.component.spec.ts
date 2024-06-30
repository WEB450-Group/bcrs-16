import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRepairComponent } from './service-repair.component';

describe('ServiceRepairComponent', () => {
  let component: ServiceRepairComponent;
  let fixture: ComponentFixture<ServiceRepairComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceRepairComponent]
    });
    fixture = TestBed.createComponent(ServiceRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

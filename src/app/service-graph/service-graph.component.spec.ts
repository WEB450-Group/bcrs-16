import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceGraphComponent } from './service-graph.component';

describe('ServiceGraphComponent', () => {
  let component: ServiceGraphComponent;
  let fixture: ComponentFixture<ServiceGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceGraphComponent]
    });
    fixture = TestBed.createComponent(ServiceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDialogComponent } from './invoice-dialog.component';

describe('InvoiceDialogComponent', () => {
  let component: InvoiceDialogComponent;
  let fixture: ComponentFixture<InvoiceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceDialogComponent]
    });
    fixture = TestBed.createComponent(InvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

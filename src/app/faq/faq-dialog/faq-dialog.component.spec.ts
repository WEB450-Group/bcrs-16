import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqDialogComponent } from './faq-dialog.component';

describe('FaqDialogComponent', () => {
  let component: FaqDialogComponent;
  let fixture: ComponentFixture<FaqDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaqDialogComponent]
    });
    fixture = TestBed.createComponent(FaqDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

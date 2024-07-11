import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyQuestionsComponent } from './verify-questions.component';

describe('VerifyQuestionsComponent', () => {
  let component: VerifyQuestionsComponent;
  let fixture: ComponentFixture<VerifyQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyQuestionsComponent]
    });
    fixture = TestBed.createComponent(VerifyQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

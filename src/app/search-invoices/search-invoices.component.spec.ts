import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInvoicesComponent } from './search-invoices.component';

describe('SearchInvoicesComponent', () => {
  let component: SearchInvoicesComponent;
  let fixture: ComponentFixture<SearchInvoicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInvoicesComponent]
    });
    fixture = TestBed.createComponent(SearchInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

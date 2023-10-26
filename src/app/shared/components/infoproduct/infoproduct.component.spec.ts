import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoproductComponent } from './infoproduct.component';

describe('InfoproductComponent', () => {
  let component: InfoproductComponent;
  let fixture: ComponentFixture<InfoproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoproductComponent]
    });
    fixture = TestBed.createComponent(InfoproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

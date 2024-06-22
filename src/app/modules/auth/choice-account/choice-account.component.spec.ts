import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceAccountComponent } from './choice-account.component';

describe('ChoiceAccountComponent', () => {
  let component: ChoiceAccountComponent;
  let fixture: ComponentFixture<ChoiceAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

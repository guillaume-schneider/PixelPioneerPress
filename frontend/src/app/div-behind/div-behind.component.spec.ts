import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivBehindComponent } from './div-behind.component';

describe('DivBehindComponent', () => {
  let component: DivBehindComponent;
  let fixture: ComponentFixture<DivBehindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivBehindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivBehindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

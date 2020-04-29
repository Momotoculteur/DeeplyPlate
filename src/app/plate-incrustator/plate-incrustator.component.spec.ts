import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateIncrustatorComponent } from './plate-incrustator.component';

describe('PlateIncrustatorComponent', () => {
  let component: PlateIncrustatorComponent;
  let fixture: ComponentFixture<PlateIncrustatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateIncrustatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateIncrustatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

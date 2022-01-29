import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManoFormaComponent } from './mano-forma.component';

describe('ManoFormaComponent', () => {
  let component: ManoFormaComponent;
  let fixture: ComponentFixture<ManoFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManoFormaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManoFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

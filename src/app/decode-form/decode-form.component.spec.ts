import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecodeFormComponent } from './decode-form.component';

describe('DecodeFormComponent', () => {
  let component: DecodeFormComponent;
  let fixture: ComponentFixture<DecodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecodeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

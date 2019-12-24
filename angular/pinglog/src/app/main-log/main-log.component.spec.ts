import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLogComponent } from './main-log.component';

describe('MainLogComponent', () => {
  let component: MainLogComponent;
  let fixture: ComponentFixture<MainLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

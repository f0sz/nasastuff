/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { APODComponent } from './apod.component';

describe('APODComponent', () => {
  let component: APODComponent;
  let fixture: ComponentFixture<APODComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APODComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APODComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

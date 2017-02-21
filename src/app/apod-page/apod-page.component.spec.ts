/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {APODPageComponent} from './apod-page.component';

describe('APODPageComponent', () => {
  let component: APODPageComponent;
  let fixture: ComponentFixture<APODPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [APODPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APODPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

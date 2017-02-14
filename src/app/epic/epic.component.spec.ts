/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EPICComponent } from './epic.component';

describe('EPICComponent', () => {
  let component: EPICComponent;
  let fixture: ComponentFixture<EPICComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EPICComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EPICComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

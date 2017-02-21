/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {EPICPageComponent} from './epic-page.component';

describe('EPICPageComponent', () => {
  let component: EPICPageComponent;
  let fixture: ComponentFixture<EPICPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EPICPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EPICPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { PageHeaderModule } from '../page-header/page-header.module';

import { ClassSessionsComponent } from './class-sessions.component';

describe('ClassesComponent', () => {
  let component: ClassSessionsComponent;
  let fixture: ComponentFixture<ClassSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      Ng2Charts,
      PageHeaderModule
    ],
      declarations: [ ClassSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

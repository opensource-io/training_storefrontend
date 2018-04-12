import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeaderModule } from './../page-header/page-header.module';
import { CoursesComponent } from './courses.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PageHeaderModule
      ],
      declarations: [ CoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

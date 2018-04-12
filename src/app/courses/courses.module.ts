import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SkusService } from '../skus.service';
import { VendorsService } from '../vendors.service';
import { PageHeaderModule } from '../page-header/page-header.module';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CoursesRoutingModule,
    PageHeaderModule,
    FormsModule
  ],
  providers: [SkusService, VendorsService],
  declarations: [CoursesComponent, CourseDetailComponent]
})
export class CoursesModule { }

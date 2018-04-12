import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorsRoutingModule } from './instructors-routing.module';
import { InstructorsComponent } from './instructors.component';
import { PageHeaderModule } from '../page-header/page-header.module';

@NgModule({
  imports: [
    CommonModule,
    InstructorsRoutingModule,
    PageHeaderModule
  ],
  declarations: [InstructorsComponent]
})
export class InstructorsModule { }

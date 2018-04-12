import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClassSessionsRoutingModule } from './class-sessions-routing.module';
import { ClassSessionsComponent } from './class-sessions.component';
import { PageHeaderModule } from '../page-header/page-header.module';
import { ClassSessionsService } from '../class-sessions.service';
import { ClassSessionDetailComponent } from '../class-session-detail/class-session-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        ClassSessionsRoutingModule,
        PageHeaderModule,
        FormsModule
    ],
    providers: [ClassSessionsService],
    declarations: [
        ClassSessionsComponent,
        ClassSessionDetailComponent
    ]
})
export class ClassesModule { }

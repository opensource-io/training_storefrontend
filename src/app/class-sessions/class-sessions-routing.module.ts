import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassSessionDetailComponent } from '../class-session-detail/class-session-detail.component';
import { ClassSessionsComponent } from './class-sessions.component';

const routes: Routes = [
    { path: '', component: ClassSessionsComponent },
    { path: ':id', component: ClassSessionDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClassSessionsRoutingModule { }

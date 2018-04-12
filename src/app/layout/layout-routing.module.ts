import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
            { path: 'class-sessions', loadChildren: '../class-sessions/class-sessions.module#ClassesModule'},
            { path: 'locations', loadChildren: '../locations/locations.module#LocationsModule'},
            // { path: 'instructors', loadChildren: '../instructors/instructors.module#InstructorsModule'},
            { path: 'courses', loadChildren: '../courses/courses.module#CoursesModule'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }

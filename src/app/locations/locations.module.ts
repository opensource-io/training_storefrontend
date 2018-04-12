import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { PageHeaderModule } from '../page-header/page-header.module';

import { AddressesService } from '../addresses.service';
import { FormsModule } from '@angular/forms';
import { LocationDetailComponent } from '../location-detail/location-detail.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    LocationsRoutingModule,
    PageHeaderModule,
    FormsModule
  ],
  providers: [AddressesService],
  declarations: [LocationsComponent, LocationDetailComponent]
})
export class LocationsModule { }

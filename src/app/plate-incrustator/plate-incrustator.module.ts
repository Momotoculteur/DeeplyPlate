import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlateIncrustatorRoutingModule } from './plate-incrustator-routing.module';
import { PlateIncrustatorComponent } from './plate-incrustator.component';


@NgModule({
  declarations: [
    PlateIncrustatorComponent
  ],
  imports: [
    CommonModule,
    PlateIncrustatorRoutingModule
  ]
})
export class PlateIncrustatorModule { }

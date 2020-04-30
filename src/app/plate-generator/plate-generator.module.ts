import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlateGeneratorRoutingModule } from './plate-generator-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlateGeneratorComponent } from './plate-generator.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [
        PlateGeneratorComponent
    ],
    imports: [
        CommonModule,
        PlateGeneratorRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        FlexLayoutModule,
        MatDividerModule,
        MatSelectModule,
        MatIconModule
    ]
})
export class PlateGeneratorModule { }

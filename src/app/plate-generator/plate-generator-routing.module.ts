import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlateGeneratorComponent } from './plate-generator.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'plateGenerator'
    },
    {
        path: 'plateGenerator',
        component: PlateGeneratorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlateGeneratorRoutingModule { }

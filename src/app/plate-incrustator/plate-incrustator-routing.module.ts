import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlateIncrustatorComponent } from './plate-incrustator.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'plateIncrustator'
    },
    {
        path: 'plateIncrustator',
        component: PlateIncrustatorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlateIncrustatorRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'welcome'
    },
    {
        path: 'welcomeModule',
        loadChildren: () => import('./welcome/welcome.module').then(mod => mod.WelcomeModule)   
    },
    {
        path: 'generatorModule',
        loadChildren: () => import('./plate-generator/plate-generator.module').then(mod => mod.PlateGeneratorModule)   
    },
    {
        path: 'incrustatorModule',
        loadChildren: () => import('./plate-incrustator/plate-incrustator.module').then(mod => mod.PlateIncrustatorModule)   
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }

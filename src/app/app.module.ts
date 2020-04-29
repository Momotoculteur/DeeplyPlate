import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxElectronModule } from 'ngx-electron';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { WelcomeModule } from './welcome/welcome.module';
import { PlateGeneratorModule } from './plate-generator/plate-generator.module';
import { PlateIncrustatorModule } from './plate-incrustator/plate-incrustator.module';


@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatButtonModule,
        NgxElectronModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        BrowserAnimationsModule,
        WelcomeModule,
        PlateGeneratorModule,
        PlateIncrustatorModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

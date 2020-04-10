import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { NuevaseriereunionComponent } from './components/nuevaseriereunion/nuevaseriereunion.component';
import { SeriereunionComponent } from './components/seriereunion/seriereunion.component';
import { ModifSerieReunionComponent } from './components/modif-serie-reunion/modif-serie-reunion.component';
import { NuevareunionComponent } from './components/nuevareunion/nuevareunion.component';
import { TemasComponent } from './components/temas/temas.component';
import { ReunionComponent } from './components/reunion/reunion.component';
import { ActaComponent } from './components/acta/acta.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AboutComponent,
    NuevaseriereunionComponent,
    SeriereunionComponent,
    ModifSerieReunionComponent,
    NuevareunionComponent,
    TemasComponent,
    ReunionComponent,
    ActaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

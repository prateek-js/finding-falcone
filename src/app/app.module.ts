import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';

// components & services
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NetworkService } from './services/network.service';
import { UtilityService } from './services/utility.service';
import { AuthGuard } from './services/authguard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlanetSelectionComponent } from './components/selection/planet-selection.component';
import { AssignVehiclesComponent } from './components/assign-vehicles/assign-vehicles.component'
import { ResultComponent } from './components/result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    PlanetSelectionComponent,
    AssignVehiclesComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [NetworkService, UtilityService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

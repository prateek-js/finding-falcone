import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/authguard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlanetSelectionComponent } from './components/selection/planet-selection.component';
import { AssignVehiclesComponent } from './components/assign-vehicles/assign-vehicles.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  // {path: '', redirectTo: 'selection', pathMatch:'full' },
  { path: '', redirectTo: 'home', pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'planet-selection', component: PlanetSelectionComponent},
  { path: 'assign-vehicles', component: AssignVehiclesComponent},
  { path: 'result', component: ResultComponent, canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}

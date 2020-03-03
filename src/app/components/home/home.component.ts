import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { Planet } from 'src/app/models/planets.model';
import { Vehicle } from 'src/app/models/vehicles.model';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  planets : Array<Planet> = [];
  vehicles : Array<Vehicle> = [];
  planetSelectedCount : number = 0;
  planetAssignedVehicles : number = 0;

  lastDragOperation : boolean = false;

  timeToTravel : number = 0;
  public localStorage = localStorage;

  constructor(private networkService : NetworkService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {

    this.planetSelectedCount = 0;
    
    this.networkService.getPlanetsData().subscribe(
      (planets : Planet[]) => {
        this.planets = [];
        for(let planet of planets) {
            planet.isSelected = false;
            this.planets.push(JSON.parse(JSON.stringify(planet)));
          } // Loop end
        localStorage.setItem('planets', JSON.stringify(planets));
      }
    )

    this.networkService.getVehiclesData().subscribe(
      (vehicles : Vehicle[]) => {
        this.vehicles = [];

        // // Repeating the vehicle the total_no that is available.
        for(let vehicle of vehicles) {
          for(let i = 1; i <= vehicle.total_no; i++) {
            vehicle.isAvailable = true;
            vehicle.id = vehicle.name + "_" + i;
            this.vehicles.push(JSON.parse(JSON.stringify(vehicle)));
          }
        } // Loop end
        localStorage.setItem('vehicles', JSON.stringify(vehicles));
      });

  }
}

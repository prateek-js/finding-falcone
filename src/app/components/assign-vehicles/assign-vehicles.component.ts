import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Planet } from 'src/app/models/planets.model';
import { Vehicle } from 'src/app/models/vehicles.model';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationExtras } from '@angular/router';


@Component({
    selector: 'assign-vehicles',
    templateUrl: './assign-vehicles.component.html',
    styleUrls: ['./assign-vehicles.component.scss']
  })
  export class AssignVehiclesComponent implements OnInit {
    vehicleList: Vehicle[] = [];
    planetList: Planet[] = [];
    planetSelectedCount = 0;
    timeToTravel = 0;
    selectedPlanet: any = {};
    assignedVehicleToPlanet: any = {};
    dataInvalid = true;
    constructor(private networkService : NetworkService, private toastr: ToastrService,
      private utilityService: UtilityService,
      private router: Router) { 
        this.selectedPlanet = new Object({
          assignedVehicle : null
        })
      }
  
    ngOnInit() {
        this.planetList = this.utilityService.getSelectedPlanetList();
        if (this.planetList.length === 0) {
          this.router.navigate(['/home']);
        }
        this.fetchVehicles();
    }

    fetchVehicles() {
      this.vehicleList = this.utilityService.getVehicleList();
      
    }
    imagePath(planetName) {
      let src = '../assets/images/planets/'+planetName+'.png';
      return src
    }

    imagePathVehicle(vehiclename) {
        let src = '../assets/images/vehicles/'+vehiclename+'.png';
        return src
    }

    planetforSelection(planet) {
        this.selectedPlanet = planet;
        this.vehicleList = this.vehicleList.map(vehicle => {
            if(vehicle.max_distance >= planet.distance && vehicle.total_no > 0) {
              vehicle.isAvailable = true;
            } else {
                vehicle.isAvailable = false;
            }
            return vehicle;
        });
    }

    assignVehicleToPlanet(vehicle) {
        this.planetList = this.planetList.map(planet=> {
            if((this.selectedPlanet.name === planet.name) && (!this.selectedPlanet.assignedVehicle && this.selectedPlanet.assignedVehicle !== vehicle)) {
              planet.assignedVehicle = vehicle;
              planet.isAssigned = true;
              vehicle.total_no--;
              vehicle.isAvailable = vehicle.total_no > 0 ? true : false;
            } else if ((this.selectedPlanet.name === planet.name) && (this.selectedPlanet.assignedVehicle && this.selectedPlanet.assignedVehicle !== vehicle)) {
              this.reassignVehicle(this.selectedPlanet.assignedVehicle);
              planet.assignedVehicle = vehicle;
              planet.isAssigned = true;
              vehicle.total_no--;
              vehicle.isAvailable = vehicle.total_no > 0 ? true : false;
            } else if((this.selectedPlanet.name === planet.name) && (this.selectedPlanet.assignedVehicle && this.selectedPlanet.assignedVehicle === vehicle)) {
              planet.assignedVehicle = null;
              planet.isAssigned = false;
              vehicle.total_no++;
              vehicle.isAvailable = vehicle.total_no > 0 ? true : false;
            }
            return planet;
        });
        this.recalculateTime();
        this.validateData();
    }

    reassignVehicle(vehicle) {
      this.vehicleList = this.vehicleList.map( item => {
        if (item.id === vehicle.id) {
          item.total_no++;
          item.isAvailable = item.total_no > 0 ? true : false;
        }
        return item;
      });
    }
    
    recalculateTime() {
        this.timeToTravel = 0;
        let travelTimes = [];
        this.planetList.forEach(planet => {
          if(planet.isSelected && planet.assignedVehicle) {
            travelTimes.push(Math.round(planet.distance / planet.assignedVehicle.speed));
          }
        });
        console.log(travelTimes);
        this.timeToTravel = travelTimes.reduce((total,num) =>
          total+num
        );
    }

    backtoPlanets() {
        this.router.navigate(['/planet-selection']);
    }

    validateData() {
      let count = 0;
      count = this.planetList.filter(
        planet => { if (planet.assignedVehicle !== null || planet.assignedVehicle) return planet; }
      ).length;
      this.dataInvalid = count == 4 ? false : true;
    }

    findFalcone() {
      let falconeData = {
        planets: [],
        vehicles: [],
      };
      falconeData.planets = (this.planetList.map(
        planet => { if (planet.assignedVehicle !== null || planet.assignedVehicle) return planet.name; }
      ));
      falconeData.vehicles = (this.planetList.map(
        planet => { if (planet.assignedVehicle !== null || planet.assignedVehicle) return planet.assignedVehicle.name; }
      ));
      this.utilityService.setTimeTaken(this.timeToTravel);
      this.utilityService.findFlacone(falconeData).subscribe((result) =>{
        this.utilityService.setResult(result);
        this.router.navigate(["result"]);
      },(error) =>{
          this.toastr.error(error, "Find falcone api call failed");
      });
    }
  }
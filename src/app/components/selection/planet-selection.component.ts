import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Planet } from 'src/app/models/planets.model';
import { Vehicle } from 'src/app/models/vehicles.model';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationExtras } from '@angular/router';


@Component({
    selector: 'planet-selection',
    templateUrl: './planet-selection.component.html',
    styleUrls: ['./planet-selection.component.scss']
  })
  export class PlanetSelectionComponent implements OnInit {
    planetList = [];
    selectedPlanets = [];
    planetSelectedCount = 0
    constructor(private networkService : NetworkService, private toastr: ToastrService,
      private utilityService: UtilityService,
      private router: Router) { }
  
    ngOnInit() {
      this.fetchPlanets();
    }

    fetchPlanets() {
      this.selectedPlanets = this.utilityService.getSelectedPlanetList();
      this.planetList = this.utilityService.getPlanetList();
      this.planetList.forEach(item1 => {
        var itemFromArr2 = this.selectedPlanets.find(item2 => item2.name == item1.name);
  
        if (itemFromArr2) {
           item1.isSelected = itemFromArr2.isSelected;
        }
     });
     this.planetSelectedCount = this.selectedPlanets.length;
    }
    imagePath(planetName) {
      let src = '../assets/images/planets/'+planetName+'.png';
      return src
    }
    selectThisPlanet(planet) {
      if(!planet.isSelected) {
        if(this.planetSelectedCount == 4) {
          this.toastr.error("Please unselect a previous selection and then select a new Planet.");
          return false;
        }  
      } 
      if(!planet.isSelected) {
        if(planet.assignedVehicle) {
          // this.resetVehicles(planet.assignedVehicle); // Reset the vehicles
          planet.assignedVehicle = null;
          // this.recalculateAssignedVehicles();
          // this.recalculateTime();
        }
      }
      planet.isSelected = !planet.isSelected;
      this.planetSelectedCount = planet.isSelected ? (this.planetSelectedCount+1) : (this.planetSelectedCount-1);
    }

    assignVehicles() {
      this.planetList = this.planetList.map(planet=> {
            planet.assignedVehicle = null;
            planet.isAssigned = false;
            return planet;
      });
      this.utilityService.setSelectedPlanetList(this.planetList);
      this.router.navigate(['/assign-vehicles']);
    }
  }
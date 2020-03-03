import { Vehicle } from './vehicles.model';

export class Planet {
    name : string;
    distance : number;
    isSelected? : boolean;
    assignedVehicle? : Vehicle;
    isAssigned?: boolean;
}
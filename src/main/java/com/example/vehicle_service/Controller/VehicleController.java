package com.example.vehicle_service.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.vehicle_service.Model.Vehicle;
import com.example.vehicle_service.Service.VehicleService;

import java.util.List;

@RestController
@RequestMapping("/api/vehicle")
@CrossOrigin(origins = "*")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping
    public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.addVehicle(vehicle);
    }

    @GetMapping("/year/{year}")
    public List<Vehicle> getVehiclesByYear(@PathVariable int year) {
        return vehicleService.getVehiclesByYear(year);
    }

    @GetMapping("/{id}/type")
    public String getVehicleType(@PathVariable Long id) {
        return vehicleService.getVehicleType(id);
    }

    @DeleteMapping("/year/{year}")
    public String deleteVehiclesByYear(@PathVariable int year) {
        vehicleService.deleteVehiclesByYear(year);
        return "Deleted all vehicle records for year " + year;
    }
}



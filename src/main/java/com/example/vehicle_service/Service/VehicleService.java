package com.example.vehicle_service.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vehicle_service.Model.Vehicle;
import com.example.vehicle_service.Repository.VehicleRepository;

import java.util.List;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public Vehicle addVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getVehiclesByYear(int year) {
        return vehicleRepository.findByServiceYear(year);
    }

    public String getVehicleType(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));
        return vehicle.getVehicleType();
    }

    public void deleteVehiclesByYear(int year) {
        vehicleRepository.deleteByServiceYear(year);
    }
}

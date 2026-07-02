package MyPack.Controller;

import MyPack.Entity.Vehicle;
import MyPack.Service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping
    public ResponseEntity<Vehicle> addVehicle(@RequestBody Vehicle vehicle) {
        Vehicle savedVehicle = vehicleService.saveVehicle(vehicle);
        return ResponseEntity.ok(savedVehicle);
    }

    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicle() {
        List<Vehicle> vehicles = vehicleService.getAllVehicle();
        return ResponseEntity.ok(vehicles);
    }

    // 🚨 जादुई सुधार: @PathVariable के अंदर ("id") साफ-साफ लिखना जरूरी है
    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable("id") Long id) {
        return vehicleService.getVehicleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🚨 सुधार: यहाँ @DeleteMapping छूटा हुआ था, उसे भी लगा दिया भाई
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable("id") Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.ok("Vehicle Successfully Deleted by Id " + id);
    }
}
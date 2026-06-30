package MyPack.Controller;

import MyPack.Entity.Vehicle;
import MyPack.Service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.hibernate.Hibernate.map;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*") // यह बहुत ज़रूरी है, ताकि रिएक्ट बिना CORS एरर के बात कर सके
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping
    public ResponseEntity<Vehicle> addVehicle(@RequestBody Vehicle vehicle)
    {
        Vehicle savedVehicle = vehicleService.saveVehicle(vehicle);
          return ResponseEntity.ok(savedVehicle);
    }
    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicle()
    {
        List<Vehicle> vehicles = vehicleService.getAllVehicle();
        return ResponseEntity.ok(vehicles);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        return vehicleService.getVehicleById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }
    public ResponseEntity<String> deleteVehicle(@PathVariable Long id)
    {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.ok("Vehicle Successfully Deleted by Id"+id);
    }

}

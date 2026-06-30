package MyPack.Service;

import MyPack.Entity.Vehicle;
import MyPack.Repository.VehicleRepository;
import org.aspectj.apache.bcel.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vechRepo;

    public Vehicle saveVehicle(Vehicle vehicle)
    {
        return vechRepo.save(vehicle);
    }
    public List<Vehicle> getAllVehicle()
    {
     return vechRepo.findAll();
    }
    public Optional<Vehicle> getVehicleById(Long id)
    {
        return vechRepo.findById(id);
    }
    public void deleteVehicle(Long id)
    {
         vechRepo.deleteById(id);
    }
}

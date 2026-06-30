package MyPack.Repository;

import MyPack.Entity.ServiceBooking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<ServiceBooking , Long> {

}

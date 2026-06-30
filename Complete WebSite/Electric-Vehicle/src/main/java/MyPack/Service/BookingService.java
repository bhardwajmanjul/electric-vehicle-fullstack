package MyPack.Service;

import MyPack.Entity.ServiceBooking;
import MyPack.Repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
    public class BookingService {
    @Autowired
    private BookingRepository br;

    public ServiceBooking createBooking(ServiceBooking  booking) {
        if(booking.getStatus()==null){
            booking.setStatus("Pending");
        }
        return br.save(booking);
    }
    public List<ServiceBooking> getAllBooking() {
        return br.findAll();
    }
    public Optional<ServiceBooking> getBookingById(Long id) {
        return br.findById(id);
    }
    public boolean deleteBooking(Long id) {
        if (br.existsById(id)) {
            br.deleteById(id);
            return true; // Successfully Delete
        }
        return false; // if ID not Found
    }
}

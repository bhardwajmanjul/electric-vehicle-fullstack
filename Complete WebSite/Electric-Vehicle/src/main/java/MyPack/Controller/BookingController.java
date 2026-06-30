package MyPack.Controller;

import MyPack.Entity.ServiceBooking;
import MyPack.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // 1. ग्राहक द्वारा वेबसाइट से सर्विस बुक करने के लिए (POST Request)
    // URL: http://localhost:8080/api/bookings
    @PostMapping
    public ResponseEntity<ServiceBooking> addBooking(@RequestBody ServiceBooking booking) {
        ServiceBooking savedBooking = bookingService.createBooking(booking);
        return ResponseEntity.ok(savedBooking);
    }

    // 2. भैया के एडमिन पैनल के लिए सभी बुकिंग्स देखना (GET Request)
    // URL: http://localhost:8080/api/bookings
    @GetMapping
    public ResponseEntity<List<ServiceBooking>> getAllBookings() {
        List<ServiceBooking> bookings = bookingService.getAllBooking();
        return ResponseEntity.ok(bookings);
    }

    // 3. किसी एक बुकिंग को ID से देखना (GET Request)
    @GetMapping("/{id}")
    public ResponseEntity<ServiceBooking> getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 4. बुकिंग को हटाने या रद्द करने के लिए (DELETE Request)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok("Booking canceled/deleted with ID: " + id);
    }
}
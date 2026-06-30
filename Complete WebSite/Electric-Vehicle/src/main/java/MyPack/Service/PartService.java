package MyPack.Service;

import MyPack.Entity.Part;
import MyPack.Repository.PartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PartService {
    @Autowired
    private PartRepository partRepository;

    // 1. नया पार्ट जोड़ने या अपडेट करने के लिए
    public Part savePart(Part part) {
        return partRepository.save(part);
    }

    // 2. सभी स्पेयर पार्ट्स की लिस्ट देखने के लिए
    public List<Part> getAllParts() {
        return partRepository.findAll();
    }

    // 3. किसी एक पार्ट को ID से ढूंढने के लिए
    public Optional<Part> getPartById(Long id) {
        return partRepository.findById(id);
    }

    // 4. पार्ट को लिस्ट से हटाने के लिए
    public void deletePart(Long id) {
        partRepository.deleteById(id);
    }
}

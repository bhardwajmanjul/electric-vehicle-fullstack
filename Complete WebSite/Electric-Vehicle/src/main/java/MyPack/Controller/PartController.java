package MyPack.Controller;

import MyPack.Entity.Part;
import MyPack.Service.PartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
@CrossOrigin(origins = "*")
public class PartController {
    @Autowired
    private PartService ps;

    @PostMapping
    public ResponseEntity<Part> addPart(@RequestBody Part part) {
        Part savedPart = ps.savePart(part);
        return ResponseEntity.ok(savedPart);
    }
    @GetMapping
    public ResponseEntity<List<Part>> getAllParts(){
        List<Part> parts = ps.getAllParts();
        return  ResponseEntity.ok(parts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Part> getPartById(@PathVariable Long id)
    {
        return ps.getPartById(id)
                .map(ResponseEntity::ok).
                orElse(ResponseEntity.notFound().build());
    }
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        ps.deletePart(id);
        return ResponseEntity.ok("Part Successfully Deleted with Id :- "+id);
    }


}

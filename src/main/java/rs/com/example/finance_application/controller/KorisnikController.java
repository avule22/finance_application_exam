package rs.com.example.finance_application.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.com.example.finance_application.entity.Korisnik;
import rs.com.example.finance_application.service.KorisnikService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/korisnici")
@CrossOrigin
@RequiredArgsConstructor
public class KorisnikController {

    private final KorisnikService korisnikService;

    @GetMapping
    public List<Korisnik> getAllKorisnici(@RequestParam(value = "q", required = false) String query) {
        if (query != null) {
            return korisnikService.searchKorisnici(query);
        } else {
            return korisnikService.getAllKorisnici();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Korisnik> getKorisnikById(@PathVariable Integer id) {
        Optional<Korisnik> korisnik = korisnikService.findKorisnikById(id);
        if (korisnik.isPresent()) {
            return ResponseEntity.ok(korisnik.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Korisnik> createKorisnik(@RequestBody Korisnik korisnik) {
        try {
            System.out.println("Primljeni korisnik: " + korisnik);
            Korisnik savedKorisnik = korisnikService.save(korisnik);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedKorisnik);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Korisnik> updateKorisnik(@PathVariable Integer id, @RequestBody Korisnik korisnik) {
        try {
            Korisnik updatedKorisnik = korisnikService.updateKorisnik(id, korisnik);
            return ResponseEntity.ok(updatedKorisnik);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKorisnik(@PathVariable Integer id) {
        try {
            korisnikService.deleteKorisnik(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}



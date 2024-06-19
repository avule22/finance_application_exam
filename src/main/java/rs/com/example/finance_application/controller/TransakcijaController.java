package rs.com.example.finance_application.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.com.example.finance_application.TransakcijaDTO;
import rs.com.example.finance_application.entity.Transakcija;
import rs.com.example.finance_application.service.TransakcijaService;

import java.util.List;

@RestController
@RequestMapping("/transakcije")
@CrossOrigin
@RequiredArgsConstructor
public class TransakcijaController {

    private final TransakcijaService transakcijaService;

    @GetMapping
    public List<TransakcijaDTO> getAllTransakcije() {
        return transakcijaService.getAllTransakcije();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransakcijaDTO> getTransakcijaById(@PathVariable Integer id) {
        TransakcijaDTO transakcijaDTO = transakcijaService.getTransakcijaById(id);
        if (transakcijaDTO != null) {
            return ResponseEntity.ok(transakcijaDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping
    public Transakcija createTransakcija(@RequestBody Transakcija transakcija) {
        return transakcijaService.createTransakcija(transakcija);
    }

    @DeleteMapping("/{id}")
    public void deleteTransakcija(@PathVariable Integer id) {
        transakcijaService.deleteTransakcija(id);
    }
}

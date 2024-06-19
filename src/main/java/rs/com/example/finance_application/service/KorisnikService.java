package rs.com.example.finance_application.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.com.example.finance_application.entity.Korisnik;
import rs.com.example.finance_application.repository.KorisnikRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class KorisnikService {

    private final KorisnikRepository korisnikRepository;

    public List<Korisnik> getAllKorisnici() {
        return korisnikRepository.findAll();
    }

    public List<Korisnik> searchKorisnici(String query) {
        return korisnikRepository.findByImeContainingIgnoreCase(query);
    }

    public Optional<Korisnik> findKorisnikById(Integer id) {
        return korisnikRepository.findById(id);
    }

    public Korisnik save(Korisnik korisnik) {
        return korisnikRepository.save(korisnik);
    }

    public Korisnik updateKorisnik(Integer id, Korisnik korisnik) {
        Optional<Korisnik> existingKorisnik = korisnikRepository.findById(id);
        if (existingKorisnik.isPresent()) {
            Korisnik updatedKorisnik = existingKorisnik.get();
            updatedKorisnik.setIme(korisnik.getIme());
            updatedKorisnik.setPrezime(korisnik.getPrezime());
            updatedKorisnik.setEmail(korisnik.getEmail());
            updatedKorisnik.setSifra(korisnik.getSifra());
            updatedKorisnik.setBudzet(korisnik.getBudzet());
            return korisnikRepository.save(updatedKorisnik);
        } else {
            throw new RuntimeException("Korisnik not found with id " + id);
        }
    }

    public void deleteKorisnik(Integer id) {
        korisnikRepository.deleteById(id);
    }
}

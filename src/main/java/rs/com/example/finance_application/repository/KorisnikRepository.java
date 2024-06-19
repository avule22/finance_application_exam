package rs.com.example.finance_application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.com.example.finance_application.entity.Korisnik;

import java.util.List;

@Repository
public interface KorisnikRepository extends JpaRepository<Korisnik, Integer> {
    List<Korisnik> findByImeContainingIgnoreCase(String query);
}

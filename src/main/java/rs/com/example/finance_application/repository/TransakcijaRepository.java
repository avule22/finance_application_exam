package rs.com.example.finance_application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.com.example.finance_application.entity.Transakcija;

import java.util.List;

@Repository
public interface TransakcijaRepository extends JpaRepository<Transakcija, Integer> {
    List<Transakcija> findAll();
}

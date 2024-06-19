package rs.com.example.finance_application.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.util.List;

@Entity(name = "korisnici")
@NoArgsConstructor
@Getter
@Setter
public class Korisnik {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "korisnik_id", nullable = false)
    private Integer id;

    private String ime;
    private String prezime;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String sifra;

    private BigDecimal budzet;

    @OneToMany(mappedBy = "korisnik", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Transakcija> transakcije;

}

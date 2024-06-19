package rs.com.example.finance_application.entity;


import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity(name = "transakcije")
@NoArgsConstructor
@Getter
@Setter
public class Transakcija {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transakcije_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "korisnik_id")
    @JsonBackReference
    private Korisnik korisnik;

    private BigDecimal iznos;

    public enum Tip {
        PRIHOD, RASHOD
    }

    @Enumerated(EnumType.STRING)
    private Tip tip;

    private String opis;

    @Column(nullable = false)
    private LocalDateTime datum_unosa = LocalDateTime.now();
}


package rs.com.example.finance_application;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TransakcijaDTO {
    private Integer id;
    private BigDecimal iznos;
    private String tip;
    private String opis;
    private LocalDateTime datumUnosa;
    private Integer korisnikId;
    private String korisnikIme;
    private String korisnikPrezime;
}

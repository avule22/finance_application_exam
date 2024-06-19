package rs.com.example.finance_application.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.com.example.finance_application.TransakcijaDTO;
import rs.com.example.finance_application.entity.Transakcija;
import rs.com.example.finance_application.repository.TransakcijaRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransakcijaService {

    private final TransakcijaRepository transakcijaRepository;

    public List<TransakcijaDTO> getAllTransakcije() {
        return transakcijaRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public TransakcijaDTO getTransakcijaById(Integer id) {
        return transakcijaRepository.findById(id).map(this::mapToDTO).orElse(null);
    }

    public Transakcija createTransakcija(Transakcija transakcija) {
        return transakcijaRepository.save(transakcija);
    }

    public void deleteTransakcija(Integer id) {
        transakcijaRepository.deleteById(id);
    }

    private TransakcijaDTO mapToDTO(Transakcija transakcija) {
        TransakcijaDTO dto = new TransakcijaDTO();
        dto.setId(transakcija.getId());
        dto.setKorisnikIme(transakcija.getKorisnik().getIme());
        dto.setKorisnikPrezime(transakcija.getKorisnik().getPrezime());
        dto.setIznos(transakcija.getIznos());
        dto.setTip(transakcija.getTip().name());
        dto.setOpis(transakcija.getOpis());
        dto.setDatumUnosa(transakcija.getDatum_unosa());
        return dto;
    }
}

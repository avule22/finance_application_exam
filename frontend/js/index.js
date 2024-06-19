document.addEventListener("DOMContentLoaded", function () {
  const korisniciLista = document.getElementById("korisnici-lista")
  const searchInput = document.getElementById("navbarSearchInput")

  function fetchKorisnici() {
    fetch('http://localhost:8000/korisnici')
      .then(response => response.json())
      .then(data => {
        displayKorisnici(data)
      })
      .catch(error => console.error("Greška prilikom dohvatanja korisnika:", error))
  }

  document.getElementById('logoutBtn').addEventListener('click', function () {
    localStorage.removeItem('isLoggedIn')
    window.location.href = 'login.html'
  })

  function displayKorisnici(data) {
    korisniciLista.innerHTML = ""
    data.forEach(korisnik => {
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${korisnik.ime}</td>
        <td>${korisnik.prezime}</td>
        <td>${korisnik.email}</td>
        <td>${korisnik.sifra}</td>
        <td>${korisnik.budzet}</td>
        <td>
          <a href="uredi_korisnika.html?id=${korisnik.id}" class="btn btn-warning btn-sm"><i class="fa-solid fa-pen-to-square"></i></a>
          <button class="btn btn-danger btn-sm" onclick="obrisiKorisnika(${korisnik.id})"><i class="fa-solid fa-eraser"></i></button>
        </td>
      `
      korisniciLista.appendChild(row)
    })
  }

  window.obrisiKorisnika = function (id) {
    if (confirm("Da li ste sigurni da želite obrisati ovog korisnika?")) {
      fetch(`http://localhost:8000/korisnici/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Greška prilikom brisanja korisnika")
          }
          fetchKorisnici()
        })
        .catch(error => console.error("Greška prilikom brisanja korisnika:", error))
    }
  }

  function searchKorisnici() {
    const searchTerm = searchInput.value.toLowerCase()
    const rows = korisniciLista.getElementsByTagName("tr")
    for (let row of rows) {
      const columns = row.getElementsByTagName("td")
      let match = false
      for (let column of columns) {
        if (column.textContent.toLowerCase().includes(searchTerm)) {
          match = true;
          break;
        }
      }
      row.style.display = match ? "" : "none"
    }
  }

  searchInput.addEventListener("input", searchKorisnici)

  fetchKorisnici()
})


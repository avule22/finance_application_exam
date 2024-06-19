document.addEventListener("DOMContentLoaded", function () {
  const transakcijaForm = document.getElementById("dodaj-transakciju-form")
  const korisnikSelect = document.getElementById("korisnik")
  const transakcijeTableBody = document.getElementById("transakcije-table-body")
  const searchInput = document.getElementById("navbarSearchInput")

  function fetchKorisnici() {
    fetch("http://localhost:8000/korisnici")
      .then(response => response.json())
      .then(data => {
        korisnikSelect.innerHTML = ""
        data.forEach(korisnik => {
          const option = document.createElement("option")
          option.value = korisnik.id
          option.textContent = korisnik.ime + " " + korisnik.prezime
          korisnikSelect.appendChild(option)
        })
      })
      .catch(error => console.error("Error:", error))
  }

  document.getElementById('logoutBtn').addEventListener('click', function () {
    localStorage.removeItem('isLoggedIn')
    window.location.href = 'login.html'
  })

  function fetchTransakcije() {
    fetch("http://localhost:8000/transakcije")
      .then(response => response.json())
      .then(data => {
        displayTransakcije(data)
      })
      .catch(error => console.error("Error:", error))
  }

  function displayTransakcije(data) {
    transakcijeTableBody.innerHTML = ""
    data.forEach(transakcija => {
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${transakcija.korisnikIme + " " + transakcija.korisnikPrezime}</td>
        <td>${transakcija.iznos}</td>
        <td>${transakcija.tip}</td>
        <td>${transakcija.opis}</td>
        <td>${new Date(transakcija.datumUnosa).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="deleteTransakcija(${transakcija.id})"><i class="fa-solid fa-eraser"></i></button>
        </td>
      `
      transakcijeTableBody.appendChild(row)
    })
  }

  transakcijaForm.addEventListener("submit", function addTransakcija(event) {
    event.preventDefault()

    const transakcija = {
      korisnik: { id: parseInt(document.getElementById("korisnik").value) },
      iznos: parseFloat(document.getElementById("iznos").value),
      tip: document.getElementById("tip").value,
      opis: document.getElementById("opis").value
    }

    fetch("http://localhost:8000/transakcije", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transakcija)
    })
      .then(response => response.json())
      .then(data => {
        fetchTransakcije()
        transakcijaForm.reset()
      })
      .catch(error => console.error("Error:", error))
  })

  window.deleteTransakcija = function (id) {
    fetch(`http://localhost:8000/transakcije/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          fetchTransakcije()
        } else {
          console.error("Greška prilikom brisanja transakcije.")
        }
      })
      .catch(error => console.error("Error:", error))
  }

  function searchTransakcije() {
    const searchTerm = searchInput.value.toLowerCase()
    const rows = transakcijeTableBody.getElementsByTagName("tr")
    for (let row of rows) {
      const columns = row.getElementsByTagName("td")
      let match = false
      for (let column of columns) {
        if (column.textContent.toLowerCase().includes(searchTerm)) {
          match = true
          break
        }
      }
      row.style.display = match ? "" : "none"
    }
  }

  searchInput.addEventListener("input", searchTransakcije)

  fetchKorisnici()
  fetchTransakcije()
})
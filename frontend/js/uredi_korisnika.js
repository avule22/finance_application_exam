document.addEventListener("DOMContentLoaded", function () {
  const korisnikForm = document.getElementById("uredi-korisnik-form")
  const urlParams = new URLSearchParams(window.location.search)
  const korisnikId = urlParams.get('id')
  const toggleSifraButton = document.getElementById("toggleSifra")
  const sifraInput = document.getElementById("sifra")

  if (!korisnikId) {
    console.error("ID korisnika nije pronađen u URL-u.")
    return
  }

  function fetchKorisnikById(id) {
    fetch(`http://localhost:8000/korisnici/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Greška prilikom dohvatanja korisnika")
        }
        return response.json()
      })
      .then(data => {
        document.getElementById("ime").value = data.ime
        document.getElementById("prezime").value = data.prezime
        document.getElementById("email").value = data.email
        document.getElementById("sifra").value = data.sifra
        document.getElementById("budzet").value = data.budzet
      })
      .catch(error => console.error("Greška prilikom dohvatanja korisnika:", error))
  }

  document.getElementById('logoutBtn').addEventListener('click', function () {
    localStorage.removeItem('isLoggedIn')
    window.location.href = 'login.html'
  })

  korisnikForm.addEventListener("submit", function (event) {
    event.preventDefault()

    let ime = document.getElementById("ime").value.trim()
    let prezime = document.getElementById("prezime").value.trim()
    let email = document.getElementById("email").value.trim()
    let sifra = document.getElementById("sifra").value.trim()
    let budzet = document.getElementById("budzet").value.trim()

    let valid = true

    if (!/^[A-ZČĆŠĐŽ][a-zčćšđž]+$/.test(ime)) {
      document.getElementById("ime").classList.add("is-invalid")
      valid = false
    } else {
      document.getElementById("ime").classList.remove("is-invalid")
    }

    if (!/^[A-ZČĆŠĐŽ][a-zčćšđž]+$/.test(prezime)) {
      document.getElementById("prezime").classList.add("is-invalid")
      valid = false
    } else {
      document.getElementById("prezime").classList.remove("is-invalid")
    }

    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
      document.getElementById("email").classList.add("is-invalid")
      valid = false
    } else {
      document.getElementById("email").classList.remove("is-invalid")
    }

    if (sifra.length < 6) {
      document.getElementById("sifra").classList.add("is-invalid")
      valid = false
    } else {
      document.getElementById("sifra").classList.remove("is-invalid")
    }

    if (isNaN(budzet) || budzet < 0) {
      document.getElementById("budzet").classList.add("is-invalid")
      valid = false
    } else {
      document.getElementById("budzet").classList.remove("is-invalid")
    }

    if (!valid) {
      return
    }

    const data = {
      ime: ime,
      prezime: prezime,
      email: email.toLowerCase(),
      sifra: sifra,
      budzet: parseFloat(budzet)
    };

    fetch(`http://localhost:8000/korisnici/${korisnikId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            console.error("Greška prilikom ažuriranja korisnika:", errorData)
            throw new Error("Greška prilikom ažuriranja korisnika.")
          })
        }
        window.location.href = "index.html"
      })
      .catch(error => console.error("Greška prilikom ažuriranja korisnika:", error))
  })

  toggleSifraButton.addEventListener("click", function () {
    if (sifraInput.type === "password") {
      sifraInput.type = "text"
      toggleSifraButton.innerHTML = '<i class="fa fa-eye-slash"></i>'
    } else {
      sifraInput.type = "password"
      toggleSifraButton.innerHTML = '<i class="fa fa-eye"></i>'
    }
  })

  fetchKorisnikById(korisnikId)
})

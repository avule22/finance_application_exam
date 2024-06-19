document.addEventListener("DOMContentLoaded", function () {
  const korisnikForm = document.getElementById("korisnikForm")
  const toggleSifraButton = document.getElementById("toggleSifra")
  const sifraInput = document.getElementById("sifra")

  document.getElementById('logoutBtn').addEventListener('click', function () {
    localStorage.removeItem('isLoggedIn')
    window.location.href = 'login.html'
  })

  if (korisnikForm) {
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

      const korisnik = {
        ime: ime,
        prezime: prezime,
        email: email.toLowerCase(),
        sifra: sifra,
        budzet: parseFloat(budzet)
      }

      console.log("Sending korisnik data:", korisnik)

      fetch("http://localhost:8000/korisnici", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(korisnik)
      })
        .then(response => {
          console.log("Raw response:", response)
          if (response.ok) {
            return response.json()
          } else {
            return response.json().then(errorData => {
              console.error("Greška prilikom dodavanja korisnika:", errorData)
              throw new Error("Greška prilikom dodavanja korisnika.")
            })
          }
        })
        .then(data => {
          console.log("Korisnik added successfully:", data)
          korisnikForm.reset();
          window.location.href = "index.html"
        })
        .catch(error => console.error("Greška prilikom dodavanja korisnika:", error))
    })
  }
  toggleSifraButton.addEventListener("click", function () {
    if (sifraInput.type === "password") {
      sifraInput.type = "text"
      toggleSifraButton.innerHTML = '<i class="fa fa-eye-slash"></i>'
    } else {
      sifraInput.type = "password"
      toggleSifraButton.innerHTML = '<i class="fa fa-eye"></i>'
    }
  })
})

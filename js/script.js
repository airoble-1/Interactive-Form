// DOM selection
const form = document.querySelector("form")
const nameInput = document.querySelector("#name")
const emailInput = document.querySelector("#email")
const otherJobInput = document.querySelector("#other-job-role")
const jobSelect = document.querySelector("#title")
const shirtColorSelect = document.querySelector("#color")
const shirtDesignSelect = document.querySelector("#design")
const shirtColorOptions = shirtColorSelect.children
const activitiesFieldset = document.querySelector("#activities")
const activitiesCost = document.querySelector("#activities-cost")
const paymentSelect = document.querySelector("#payment")
const paymentOptions = paymentSelect.children
const creditcard = document.querySelector("#credit-card")
const creditcardNum = document.querySelector("#cc-num")
const zip = document.querySelector("#zip")
const cvv = document.querySelector("#cvv")
const paypal = document.querySelector("#paypal")
const bitcoin = document.querySelector("#bitcoin")

let total = 0

// The name field
nameInput.focus()
otherJobInput.style.display = "none"
shirtColorSelect.disabled = true

// Job role section
jobSelect.addEventListener("change", (e) => {
  if (jobSelect.value === "other") {
    otherJobInput.style.display = "inline-block"
  } else {
    otherJobInput.style.display = "none"
  }
})

// T-shirt info section
shirtDesignSelect.addEventListener("change", (e) => {
  shirtColorSelect.disabled = false
  const colorOption = e.target.value
  for (let i = 0; i < shirtColorOptions.length; i++) {
    const dataTheme = shirtColorOptions[i].getAttribute("data-theme")
    if (colorOption === dataTheme) {
      shirtColorOptions[i].hidden = false
    } else {
      shirtColorOptions[i].hidden = true
    }
  }
})

// register for activities
activitiesFieldset.addEventListener("change", (e) => {
  let cost = parseInt(e.target.getAttribute("data-cost"))
  if (e.target.checked) {
    total += cost
  } else {
    total -= cost
  }
  activitiesCost.textContent = `Total: $${total}`
})

// payment info
bitcoin.style.display = "none"
paypal.style.display = "none"
paymentOptions[1].setAttribute("selected", "selected")

paymentSelect.addEventListener("change", (e) => {
  const option = e.target.value
  if (option === "paypal") {
    paypal.style.display = "block"
    creditcard.style.display = "none"
    bitcoin.style.display = "none"
  } else if (option === "bitcoin") {
    bitcoin.style.display = "block"
    creditcard.style.display = "none"
    paypal.style.display = "none"
  } else if (option === "credit-card") {
    creditcard.style.display = "block"
    paypal.style.display = "none"
    bitcoin.style.display = "none"
  }
})

const isNameValid = function (name) {
  let re = /^[a-z]+ [a-z]+$/i
  return re.test(name)
}

// form validation
form.addEventListener("submit", (e) => {
  if (!isNameValid(nameInput.value)) {
    e.preventDefault()
  }
})

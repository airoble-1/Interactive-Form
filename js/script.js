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
const activitiesCheckboxs = document.querySelectorAll(
  "#activities-box input[type=checkbox]"
)
console.log(activitiesCheckboxs[2])
const activitiesCost = document.querySelector("#activities-cost")
const paymentSelect = document.querySelector("#payment")
const paymentOptions = paymentSelect.children
const creditcard = document.querySelector("#credit-card")
const creditcardInput = document.querySelector("#cc-num")
const zipInput = document.querySelector("#zip")
const cvvInput = document.querySelector("#cvv")
const paypal = document.querySelector("#paypal")
const bitcoin = document.querySelector("#bitcoin")

let total = 0

// On page load
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

// payment info section
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

// Form validation functions
const isNameValid = function (name) {
  if (/^[a-z]+ [a-z]+$/i.test(name)) {
    nameInput.parentElement.classList.add(".valid")
    nameInput.parentElement.classList.remove(".not-valid")
    nameInput.parentElement.lastElementChild.style.display = "none"
  } else {
    nameInput.parentElement.classList.remove(".valid")
    nameInput.parentElement.classList.add(".not-valid")
    nameInput.parentElement.lastElementChild.style.display = "inline"
  }
  return /^[a-z]+ [a-z]+$/i.test(name)
}
const isEmailValid = function (email) {
  if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(email)) {
    emailInput.parentElement.classList.add(".valid")
    emailInput.parentElement.classList.remove(".not-valid")
    emailInput.parentElement.lastElementChild.style.display = "none"
  } else {
    emailInput.parentElement.classList.remove(".valid")
    emailInput.parentElement.classList.add(".not-valid")
    emailInput.parentElement.lastElementChild.style.display = "inline"
  }
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email)
}
const isActivitiesSelected = function (total) {
  if (total > 0) {
    activitiesFieldset.classList.add(".valid")
    activitiesFieldset.classList.remove(".not-valid")
    activitiesFieldset.lastElementChild.style.display = "none"
  } else {
    activitiesFieldset.classList.remove(".valid")
    activitiesFieldset.classList.add(".not-valid")
    activitiesFieldset.lastElementChild.style.display = "block"
  }
  return total > 0
}
const isCreditCardNumValid = function (creditcardNum) {
  if (/^\d{13,16}$/.test(parseInt(creditcardNum))) {
    creditcardInput.parentElement.classList.add(".valid")
    creditcardInput.parentElement.classList.remove(".not-valid")
    creditcardInput.parentElement.lastElementChild.style.display = "none"
  } else {
    creditcardInput.parentElement.classList.remove(".valid")
    creditcardInput.parentElement.classList.add(".not-valid")
    creditcardInput.parentElement.lastElementChild.style.display = "inline"
  }
  return /^\d{13,16}$/.test(parseInt(creditcardNum))
}
const isZipCodeValid = function (zipcode) {
  if (/^\d{5}$/.test(parseInt(zipcode))) {
    zipInput.parentElement.classList.add(".valid")
    zipInput.parentElement.classList.remove(".not-valid")
    zipInput.parentElement.lastElementChild.style.display = "none"
  } else {
    zipInput.parentElement.classList.remove(".valid")
    zipInput.parentElement.classList.add(".not-valid")
    zipInput.parentElement.lastElementChild.style.display = "inline"
  }
  return /^\d{5}$/.test(parseInt(zipcode))
}
const isCVVValid = function (cvv) {
  if (/^\d{3}$/.test(parseInt(cvv))) {
    cvvInput.parentElement.classList.add(".valid")
    cvvInput.parentElement.classList.remove(".not-valid")
    cvvInput.parentElement.lastElementChild.style.display = "none"
  } else {
    cvvInput.parentElement.classList.remove(".valid")
    cvvInput.parentElement.classList.add(".not-valid")
    cvvInput.parentElement.lastElementChild.style.display = "inline"
  }
  return /^\d{3}$/.test(parseInt(cvv))
}

const isCreditCardValid = function () {
  if (paymentSelect.value === "credit-card") {
    return (
      isCreditCardNumValid(creditcardInput.value) &&
      isZipCodeValid(zipInput.value) &&
      isCVVValid(cvvInput.value)
    )
  }
}
// form validation for submit
form.addEventListener("submit", (e) => {
  isNameValid(nameInput.value)
  isEmailValid(emailInput.value)
  isActivitiesSelected(total)
  isCreditCardNumValid(creditcardInput.value)
  isZipCodeValid(zipInput.value)
  isCVVValid(cvvInput.value)
  if (
    !isNameValid(nameInput.value) ||
    !isEmailValid(emailInput.value) ||
    !isActivitiesSelected(total) ||
    !isCreditCardValid()
  ) {
    e.preventDefault()
  }
})

// improve accessibility on activities section
for (let i = 0; i < activitiesCheckboxs.length; i++) {
  activitiesCheckboxs[i].addEventListener("focus", (e) => {
    activitiesCheckboxs[i].parentElement.classList.add("focus")
  })
  activitiesCheckboxs[i].addEventListener("blur", (e) => {
    activitiesCheckboxs[i].parentElement.classList.remove("focus")
  })
}

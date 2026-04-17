const converterForm = document.getElementById("converter-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

// Add these logs at the very top to see if elements exist
console.log("From Select:", fromCurrency);
console.log("To Select:", toCurrency);

async function fetchCurrencies() {
  try {
    const response = await fetch("https://v6.exchangerate-api.com/v6/efa3487f5d8f9125aad652a9/latest/USD");
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data received successfully:", data);

    const currencyOptions = Object.keys(data.conversion_rates);

    // Clear existing options just in case
    fromCurrency.innerHTML = "";
    toCurrency.innerHTML = "";

    currencyOptions.forEach((currency) => {
      // We can use a simpler approach to create the options
      fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
      toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    });

    console.log("Dropdowns should be populated now.");

  } catch (error) {
    console.error("Fetch failed:", error);
    resultDiv.textContent = "Failed to load currencies. Check console.";
  }
}

window.addEventListener("load", fetchCurrencies);

converterForm.addEventListener("submit", convertCurrency);

async function fetchCurrencies() {
  const response = await fetch("https://v6.exchangerate-api.com/v6/efa3487f5d8f9125aad652a9/latest/USD");
  const data = await response.json();

 console.log(data);
  const currencyOptions = Object.keys(data.conversion_rates);
  currencyOptions.forEach((currency) => {
  const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });
}

async function convertCurrency(e) {
  e.preventDefault();

  const amount = parseFloat(amountInput.value);
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;

  if (isNaN(amount) || amount < 0) {
    alert("Please enter a valid amount");
    return;
  }

  const response = await fetch(`https://v6.exchangerate-api.com/v6/efa3487f5d8f9125aad652a9/latest/${fromCurrencyValue}`);
  const data = await response.json();

  const rate = data.conversion_rates[toCurrencyValue];
  const convertedAmount = (amount * rate).toFixed(2);

 resultDiv.textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
}

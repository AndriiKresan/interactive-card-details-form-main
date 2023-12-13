const btn = document.getElementById("btn-confirm");
const form = document.getElementsByTagName("form")[0];
const successMessage = document.getElementsByClassName("success-message")[0];

const name = {
  input: document.getElementById("input-name"),
  error: document.getElementById("error-name"),
  display: document.getElementById("display-card-name"),
};
const number = {
  input: document.getElementById("input-number"),
  error: document.getElementById("error-number"),
  display: document.getElementById("display-card-number"),
};

const month = {
  input: document.getElementById("input-mm"),
  error: document.getElementById("error-date"),
  display: document.getElementById("display-card-exp-date"),
};

const year = {
  input: document.getElementById("input-yy"),
  error: document.getElementById("error-date"),
  display: document.getElementById("display-card-exp-date"),
};
const cvc = {
  input: document.getElementById("input-cvc"),
  error: document.getElementById("error-cvc"),
  display: document.getElementById("display-card-cvc"),
};

const elements = [name, number, month, year, cvc];

btn.addEventListener("click", (btn) => {
  btn.preventDefault();

  const blank =
    isBlank(name) ||
    isBlank(number) ||
    isBlank(month) ||
    isBlank(year) ||
    isBlank(cvc);
  const valid =
    isValidNumber() && isValidMonth() && isValidYear() && isValidCVC();

  if (!blank && valid) {
    successMessage.classList.remove("hidden");
    form.classList.add("hidden");
    name.display.textContent = name.input.value;
    number.display.textContent = number.input.value;
    month.display.textContent = `${month.input.value}/${year.input.value}`;
  } else {
    if (isBlank(name)) {
      showBlankError(name);
    } else {
      hideError(name);
    }

    if (isBlank(number)) {
      showBlankError(number);
    } else if (!isValidNumber()) {
      showFormatError(number);
    } else {
      hideError(number);
    }

    if (isBlank(month)) {
      showBlankError(month);
    } else if (!isValidMonth()) {
      showFormatError(month);
    } else {
      hideError(month);
    }

    if (isBlank(year)) {
      showBlankError(year);
    } else if (!isValidYear()) {
      showFormatError(year);
    } else {
      hideError(year);
    }

    if (isBlank(cvc)) {
      showBlankError(cvc);
    } else if (!isValidCVC()) {
      showFormatError(cvc);
    } else {
      hideError(cvc);
    }
  }
});

number.input.addEventListener("input", () => {
  if (
    (number.input.value.length > 16) |
    /[^0-9]/g.test(number.input.value.slice(-1))
  ) {
    number.input.value = number.input.value.slice(0, -1);
  }
});

number.input.addEventListener("focusin", () => {
  number.input.value = number.input.value.replaceAll(" ", "");
});

number.input.addEventListener("focusout", () => {
  if (number.input.value.length !== 0) {
    number.input.value = [
      number.input.value.replaceAll(" ", "").slice(0, 4),
      number.input.value.replaceAll(" ", "").slice(4, 8),
      number.input.value.replaceAll(" ", "").slice(8, 12),
      number.input.value.replaceAll(" ", "").slice(12),
    ].join(" ");
  }
});

month.input.addEventListener("focusout", () => {
  if (month.input.value.length === 1) {
    month.input.value = "0" + month.input.value;
  }
});
month.input.addEventListener("input", () => {
  if (month.input.value.length > 2) {
    month.input.value = month.input.value.slice(0, -1);
  }
});

year.input.addEventListener("focusout", () => {
  if (year.input.value.length === 1) {
    year.input.value = "0" + year.input.value;
  }
});
year.input.addEventListener("input", () => {
  if (year.input.value.length > 2) {
    year.input.value = year.input.value.slice(0, -1);
  }
});

cvc.input.addEventListener("input", () => {
  if (cvc.input.value.length > 3) {
    cvc.input.value = cvc.input.value.slice(0, -1);
  }
});

function isBlank(obj) {
  if (obj.input.value === "" || obj.input.value.length === 0) {
    return true;
  }
  return false;
}

function isValidNumber() {
  if (number.input.value.replaceAll(" ", "").length === 16) {
    return true;
  }
  return false;
}

function isValidMonth() {
  if (Number(month.input.value) > 0 && Number(month.input.value) <= 12) {
    return true;
  }
  return false;
}

function isValidYear() {
  const currentYear = new Date().getFullYear();
  if (Number(year.input.value) + 2000 <= currentYear) {
    return true;
  }
  return false;
}

function isValidCVC() {
  if (cvc.input.value.length < 3) {
    return false;
  }
  return true;
}

function showBlankError(obj) {
  obj.error.textContent = "Can't be blank";
  obj.error.classList.remove("hidden");
  obj.input.classList.add("red-border");
}

function showFormatError(obj) {
  obj.error.textContent = "Wrong format";
  obj.error.classList.remove("hidden");
  obj.input.classList.add("red-border");
}

// function showRedBorder(input) {
//   input.classList.add("red-border");
// }

function hideError(obj) {
  obj.error.classList.add("hidden");
  obj.input.classList.remove("red-border");
}

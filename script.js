const url = "https://restcountries.com/v3.1/region/europe";
const container = document.getElementById("container");

let data;

fetchData(url);

function fetchData(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((res) => displayCountries(res));
}

function displayCountries(countries) {
  data = countries;

  for (const country of countries) {
    const card = document.createElement("div");
    card.classList.add("card");

    const divider = document.createElement("div");
    divider.classList.add("divider");

    const flag = document.createElement("img");
    flag.src = country.flags["png"];
    card.appendChild(flag);

    const info = document.createElement("div");
    info.classList.add("info");

    const commonName = document.createElement("span");
    commonName.innerHTML = "Country: " + country.name["common"];
    info.appendChild(commonName);

    const officialName = document.createElement("span");
    officialName.innerHTML =
      "(Official name: " + country.name["official"] + ")";
    info.appendChild(officialName);

    const capital = document.createElement("span");
    capital.innerHTML = "Capital: " + country.capital;
    info.appendChild(capital);

    const population = document.createElement("span");
    population.innerHTML = "Popoulation: " + country.population;
    info.appendChild(population);

    let language = "Language: ";
    for (const property in country.languages) {
      const length = Object.keys(country.languages).length;
      if (length === 1) {
        language = language + country.languages[property];
      } else {
        language = language + country.languages[property] + ", ";
      }
    }
    const languages = document.createElement("span");
    languages.innerHTML = language;
    info.appendChild(languages);

    const currency = document.createElement("span");
    for (const key in country.currencies) {
      currency.innerHTML =
        "Currency: " +
        country.currencies[key].name +
        " (" +
        country.currencies[key].symbol +
        ")";
      info.appendChild(currency);

      const link = document.createElement("a");
      link.setAttribute('target', '_blank');
      link.href = country.maps['googleMaps'];
      link.innerHTML = "View";
      info.appendChild(link)
    }

    card.append(flag, info);
    container.append(card, divider);
  }
}

let mybutton = document.getElementById("topBtn");
window.onscroll = function () {
  scrollTop();
};

function scrollTop() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function goTop() {
  document.documentElement.scrollTop = 0;
}

function decrescent() {
  container.innerHTML = "";
  data.sort((a, b) => a.population - b.population);
  displayCountries(data);
}

function crescent() {
  container.innerHTML = "";
  data.sort((a, b) => b.population - a.population);
  displayCountries(data);
}

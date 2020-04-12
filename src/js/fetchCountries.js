import {makeFetch} from "./api";
import * as _ from 'lodash';
import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';



const refs = {
    input: document.querySelector('#myInput'),
    countryList: document.querySelector('#countryList')
}
refs.input.addEventListener('input', _.debounce(() => showCountry(), 500));

function showCountry() {
    const inputValue = refs.input.value;
    if (inputValue.length === 0) return;

    makeFetch(inputValue).then(data => {
        if (data.length > 10) {
            PNotify.alert("Too many matches found.Please enter a more specific query!");
            return;
        } else if (data.length === 1) {
            template2(data[0]);
        } else {
            template(data);
        }
    });
}

function template(countries) {
    let html = "";
    for (let i = 0; i < countries.length; i++) {
        html += `<li> ${countries[i].name} </li>`;
        addCountry(html);
    }
};

function template2(country) {
    let html = "";

    let languages = "";

    country.languages.forEach(language => {
        languages += `<li>${language.name}</li>`
    });

    html = `
        <div class="maincontainer">
        <div class="container">
        <p class="title">${country.name}</p>
        <p class="signat">Capital: ${country.capital}</p>
        <p class="signat" >Population: ${country.population}</p>
        <ul class="lang signat">Languages:${languages}</ul> 
        </div>
        <img src=${country.flag} alt="${country.name}" class="myImg" width = "320px" height ="auto">
        </div>
        `;
    addCountry(html);

};

function addCountry(html) {
    refs.countryList.innerHTML = html;
}
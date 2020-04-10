import {
    makeFetch
} from "./api";
//import { _ } from "lodash";
import * as _ from 'lodash';
import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';

// Set default styling.
//PNotify.defaults.styling = 'material';
// This icon setting requires the Material Icons font. (See below.)
//PNotify.defaults.icons = 'material';


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

    html = `<p>${country.name}</p>
        <p>Capital:${country.capital}</p>
        <p>Population:${country.population}</p>
        <img src=${country.flag} alt="Ukraine" width = "80px" height ="60px">
        <ul>${languages}</ul>
        `;
    addCountry(html);

};

function addCountry(html) {
    refs.countryList.innerHTML = html;
}
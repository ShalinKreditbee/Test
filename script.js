'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
function getnation(countryName) {
    const request = new XMLHttpRequest();

    request.open('GET', `https://restcountries.eu/rest/v2/name/${countryName}`);

    request.send();

    request.addEventListener('load', function () {
        // console.log(this.responseText)
        const data = JSON.parse(this.responseText)
        console.log(data[0])

        const html =
            `
    <article class="country">
      <img class="country__img" src="${data[0].flag}" />
      <div class="country__data">
        <h3 class="country__name">${data[0].name}</h3>
        <h4 class="country__region">${data[0].region}</h4>
        <p class="country__row"><span>👫</span>${(data[0].population / 1000000).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data[0].languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data[0].currencies[0].name}</p>
      </div>
    </article>
    `
        countriesContainer.insertAdjacentHTML('beforeend', html)
    })

}

function getVaccineSlotsByDistrict(date) {
    const request = new XMLHttpRequest();

    request.open('GET', `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=770&date=${date}`)

    request.send();

    request.addEventListener('load', function () {

        const data = JSON.parse(this.responseText)
        console.log(data)

        for (let i = 0; i < data.sessions.length; i++) {

            const sh = data.sessions;

            if (sh[i].fee_type === 'Paid')
                console.log(` Paid : ${sh[i].name} `);

            if (sh[i].fee_type === 'Free')
                console.log(` Free : ${sh[i].name} `);

            const html =
                `<article class="country">
            <img class="country__img" src="" />
            <div class="country__data">
              <h3 class="country__name">${sh[i].name}</h3>
              <p class="country__row"> ${sh[i].fee_type} ${sh[i].fee}  </p>
            </div>
          </article>`


            countriesContainer.insertAdjacentHTML("beforeend", html)
        }

    })
}


getVaccineSlotsByDistrict("16-07-2021")

//getnation("china")

const btn = document.querySelector('.btn')
const inputValue = document.querySelector('input')
const toggler = document.querySelector('.toggler')
const close = document.querySelector('#close')
const image = document.querySelector('.image')
const info = document.querySelector('.info')
const introducer = document.querySelector('.introducer')
const results = document.querySelector('.results')


const api_url = 'https://restcountries.com/v3.1/name/'

toggler.addEventListener('click', () => {
    document.body.classList.toggle('light-mode')
})

const apiFunc = () => {
    let country = inputValue.value.trim()
    fetch(`${api_url}${country}`)
        .then(res => res.json())
        .then(data => {
            if (data.length >= 1) {
                const population = data[0].population
                let population2 = population.toLocaleString('en', { useGrouping: true })
                const area = data[0].area
                let area2 = area.toLocaleString('en', { useGrouping: true })
                console.log(data);
                introducer.innerHTML = ''
                results.innerText = ''
                image.innerHTML = `<img src = '${data[0].flags.svg}'>`
                info.innerHTML = `<h3 class="country_title">${data[0].name.common}</h3>
                                        <div class="infos">
                                            <div class="infos1">
                                                <p class="official_name">Official Name : <span>${data[0].name.official}</span></p>
                                                <p class="population">Population : <span>${population2}</span></p>
                                                <p class="capital">Capital City : <span>${data[0].capital}</span></p>
                                                <p class="continent"> Continent : <span>${data[0].continents[0]}</span></p>
                                            </div>
                                            <div class="infos2">
                                                <p class="region"> Sub Regions : <span>${data[0].subregion}</span></p>
                                                <p class="area">Area : <span>${area2} km <sup>2</sup></span></p>
                                                <p class="languages">Languages : <span>${Object.values(data[0].languages)
                        .toString()
                        .split(",")
                        .join(", ")}</span></p>
                                            </div>
                                        </div>`
            }
            else {
                results.innerText = 'No results found'
                console.log('No');
                image.innerHTML = ''
                info.innerHTML = ''
            }

        })
}
const changer = (e) => {
    let country = inputValue.value
    country = e.target.value
    apiFunc()
}

inputValue.addEventListener('input', changer)

const closeFunc = () => {
    inputValue.value = ''
    image.innerHTML = ''
    results.innerText = ''
    info.innerHTML = ''
    close.classList.add('hidden')

}
function funcs(e) {
    if (e.keyCode == 27) {
        closeFunc()
    }
}
inputValue.addEventListener('keyup', funcs)
close.addEventListener('click', closeFunc)

inputValue.addEventListener("keyup", () => {
    if (inputValue.value) {
        close.classList.remove('hidden')
    }
    else {
        close.classList.add('hidden')
        image.innerHTML = ''
        results.innerHTML = ''
        info.innerHTML = ''
    }
});
const btnFunc = () => {
    let country = inputValue.value
    apiFunc()
}

function func(e) {
    if (e.keyCode == 13) {
        btnFunc()
    }
}
inputValue.addEventListener('keypress', func)
btn.addEventListener('click', btnFunc)



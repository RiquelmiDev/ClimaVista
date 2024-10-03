const form = document.querySelector('#search-form > form');
const input: HTMLInputElement | null = document.querySelector("#input-localizacao");

const sectionInfo = document.querySelector("#tempo-info")

form?.addEventListener('submit', async (event)=>{
    event.preventDefault();

    if(!input || !sectionInfo) return //se nao tiver nada no input encerre a funcao
    const localizacao = input.value;

    if(localizacao.length < 3){
        alert("O local precisa ter, pelo menos, 3 letras")
        return;
    }

    try{
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=c61bc55cd9135cddf9f3a92df322e33b&units=metric&lang=pt_br`)

    const dados = await resposta.json();

    const infos = {
        temperatura: Math.round(dados.main.temp),
        local: dados.name,
        descricao: dados.weather[0].description,
        icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
    };

    sectionInfo.innerHTML = `
        <h1>${infos.local}</h1>
        <div class="tempo-dados">
            <h2>${infos.descricao}</h2>

            <span>${infos.temperatura}°</span>

        </div>
        <div class="tempo-descricao">
            <h3></h3>
            <img src="${infos.icone}">
        </div>
    `;
    } catch (erro){
        console.log(`Deu ruim: ${erro}`)
    }
});
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector('#search-form > form');
const input = document.querySelector("#input-localizacao");
const sectionInfo = document.querySelector("#tempo-info");
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionInfo)
        return; //se nao tiver nada no input encerre a funcao
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert("O local precisa ter, pelo menos, 3 letras");
        return;
    }
    try {
        const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=c61bc55cd9135cddf9f3a92df322e33b&units=metric&lang=pt_br`);
        const dados = yield resposta.json();
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
    }
    catch (erro) {
        console.log(`Deu ruim: ${erro}`);
    }
}));

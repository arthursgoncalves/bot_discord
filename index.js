const Discord = require("discord.js");

const axios = require("axios");

require("dotenv-flow").config();

const config = {
  token: process.env.TOKEN,
  owner: process.env.OWNER,
  prefix: process.env.PREFIX,
};

const bot = new Discord.Client();

const data = new Date();

const formatText = (text) =>
  text.normalize("NFD").replace(/\W|\d/g, "").toUpperCase();

dayName = new Array(
  "domingo",
  "segunda",
  "terça",
  "quarta",
  "quinta",
  "sexta",
  "sábado"
);

monName = new Array(
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro"
);

bot.on("ready", () => {
  console.log(`Rodando, Latência em ${Math.round(bot.ws.ping)} ms`);
});

bot.on("message", async (msg) => {
  if (formatText(msg.content) == "COMANDOS") {
    msg.reply(
      "Comandos do bot: Resumo(ele gera um resumo do dia), Qual seu nome?, que dia é hoje?, dolar, euro, tempo, numero aleatorio, cellbit(saber quanto o jogo dele arrecadou)"
    );
  }

  if (formatText(msg.content) == "QUALSEUNOME") {
    msg.reply(
      "Olá meu nome é Entrosa Bot, fui desenvolvido pelo Arthur na 2º fase do curso de Análise e Desenvolvimento de Sistema"
    );
  }

  if (formatText(msg.content) == "QUEDIAEHOJE") {
    msg.reply(
      "Hoje é " +
        dayName[data.getDay()] +
        ". " +
        data.getDat[e() +
        " de " +
        monName[data.getMonth()] +
        " de " +
        data.getFullYear()]
    );
  }

  if (formatText(msg.content) == "NUMEROALEATORIO") {
    let num = Math.floor(Math.random() * 100);
    msg.reply("Número aleatorio gerado é: " + num);
  }

  if (formatText(msg.content) == "GITHUB") {
    msg.reply("Github do criador: https://github.com/arthursgoncalves");
  }

  if (`${Math.round(bot.ws.ping)}` > 170) {
    console.log(
      `Latencia muito alta (${Math.round(
        bot.ws.ping
      )} ms), verifique status da API`
    );
  } else {
    console.log(`${Math.round(bot.ws.ping)} ms`);
  }

  if (formatText(msg.content) == "DOLAR") {
    let getDolar = async () => {
      let response = await axios.get(
        "https://economia.awesomeapi.com.br/all/USD-BRL"
      );
      let dolar = response.data.USD["ask"];
      return dolar;
    };
    let dolarValue = await getDolar();
    msg.reply(`Cotação atual do dolar está em U$${dolarValue}`);
  }

  if (formatText(msg.content) == "EURO") {
    let getEuro = async () => {
      let response = await axios.get(
        "https://economia.awesomeapi.com.br/all/EUR-BRL"
      );
      let euro = response.data.EUR["ask"];
      return euro;
    };
    let euroValue = await getEuro();
    msg.reply(`Cotação atual do euro está em €${euroValue}`);
  }

  if (formatText(msg.content) == "TEMPO") {
    let getTempo = async () => {
      let responseTempo = await axios.get(
        "http://api.openweathermap.org/data/2.5/weather?q=Florianopolis,br&appid=a230c1205e3e38fc95187481d980a02e&lang=pt_br&units=metric"
      );
      let tempo = responseTempo.data.main["temp"];
      return tempo;
    };
    let tempoValue = await getTempo();
    msg.reply(
      `Tempo para Florianópolis hoje é de aproximadamente ${tempoValue} Cº`
    );
  }

  if (formatText(msg.content) == "RESUMO") {
    let getEuro = async () => {
      let response = await axios.get(
        "https://economia.awesomeapi.com.br/all/EUR-BRL"
      );
      let euro = response.data.EUR["ask"];
      return euro;
    };
    let euroValue = await getEuro();

    let getTempo = async () => {
      let responseTempo = await axios.get(
        "http://api.openweathermap.org/data/2.5/weather?q=Florianopolis,br&appid=a230c1205e3e38fc95187481d980a02e&lang=pt_br&units=metric"
      );
      let tempo = responseTempo.data.main["temp"];
      return tempo;
    };
    let tempoValue = await getTempo();

    let getSituacao = async () => {
      let responseSituacao = await axios.get(
        "http://api.openweathermap.org/data/2.5/weather?q=Florianopolis,br&appid=a230c1205e3e38fc95187481d980a02e&lang=pt_br&units=metric"
      );
      let situacao = responseSituacao.data.weather["0"]["description"];
      return situacao;
    };
    let situacaoValue = await getSituacao();

    let getDolar = async () => {
      let response = await axios.get(
        "https://economia.awesomeapi.com.br/all/USD-BRL"
      );
      let dolar = response.data.USD["ask"];
      return dolar;
    };
    let dolarValue = await getDolar();

    msg.reply(
      `Bom dia, Boa tarde ou Boa noite. Hoje é ${
        dayName[data.getDay()]
      } dia ${data.getDate()} de ${
        monName[data.getMonth()]
      } de  ${data.getFullYear()}. Começando o resumo do dia com a cotação atual do dolar em U$${dolarValue} e a cotação atual do euro em €${euroValue}, a temperatura para Florianópolis é de aproximadamente ${tempoValue} Cº, Situação do céu: "${situacaoValue}"`
    );
  }

  if (formatText(msg.content) == "CELLBIT") {
    let getCellbit = async () => {
      let responseCellbit = await axios.get(
        "https://api.catarse.me/project_details?project_id=eq.122021"
      );
      let cellbit = responseCellbit.data[0]["pledged"];
      return cellbit;
    };
    let cellbitValue = await getCellbit();
    msg.reply(`O jogo do cellbit arrecadou até agora R$${cellbitValue} reais`);
  }
});
bot.login(config.token);

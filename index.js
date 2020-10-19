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
  bot.user.setActivity("você", { type: "LISTENING" });
});

bot.on("message", async (msg) => {
  if (formatText(msg.content) == "COMANDOS") {
    msg.reply(
      "Comandos do bot: Qual seu nome?, que dia é hoje?, dolar, tempo, numero aleatorio"
    );
  }

  if (formatText(msg.content) == "QUALSEUNOME") {
    msg.reply(
      "Olá meu nome é Careca Bot, fui desenvolvido pelo Arthur na 2º fase do curso de Análise e Desenvolvimento de Sistema"
    );
  }

  if (formatText(msg.content) == "QUEDIAEHOJE") {
    msg.reply(
      "Hoje é " +
        dayName[data.getDay()] +
        ". " +
        data.getDate() +
        " de " +
        monName[data.getMonth()] +
        " de " +
        data.getFullYear()
    );
  }

  if (formatText(msg.content) == "NUMEROALEATORIO") {
    let num = Math.floor(Math.random() * 100);
    msg.reply("Número aleatorio gerado é: " + num);
  }

  if (`${Math.round(bot.ws.ping)}` > 90) {
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
});
bot.login(config.token);

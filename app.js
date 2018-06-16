const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const { get } = require("snekfetch"); 
var fs = require("fs");
var funCommand = fs.readFileSync("txt/funcommands.txt", {"encoding": "utf-8"});
var adminCommand = fs.readFileSync("txt/admincommands.txt", {"encoding": "utf-8"});
var help = fs.readFileSync("txt/help.txt", {"encoding": "utf-8"});
var liens = fs.readFileSync("txt/liens.txt", {"encoding": "utf-8"})
var secret = fs.readFileSync("txt/secret.txt", {"encoding": "utf-8"})


client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`
███╗   ██╗██╗   ██╗███████╗██████╗  █████╗ 
████╗  ██║╚██╗ ██╔╝██╔════╝██╔══██╗██╔══██╗
██╔██╗ ██║ ╚████╔╝ █████╗  ██████╔╝███████║
██║╚██╗██║  ╚██╔╝  ██╔══╝  ██╔══██╗██╔══██║
██║ ╚████║   ██║   ██║     ██║  ██║██║  ██║
╚═╝  ╚═══╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝`);
  console.log(`Le bot a démarré, avec ${client.users.size} utilisateurs, dans ${client.channels.size} channels de ${client.guilds.size} serveurs.`);
  console.log(`Nyfra is ready with the config.json :`)
  console.log(config)
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setPresence({
    game: {
      name: '*help',
      type: 3
    }
});
});

client.on("ready", () => {
    client.user.setStatus("dnd");
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }

  if(command === "454695690279452673") {
  	message.author.send(secret)
  	message.delete(10)
  }

  if(command === 'naksu') {
    var naksu = 
        message.author.send("Tu oses déranger mon créateur ?");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        console.log(collector)
        collector.on('collect', message => {
            if (message.content === "Oui") {
                message.channel.send("...");
            } else if (message.content === "Non") {
                message.channel.send("Alors, n'utilise plus jamais cette commande !");
            }
        })

  }    

  if(command === "8ball") {
    if(!args[2]) return message.channel.send(":8ball: **| Je n'ai pas compris..**");
    let replies = ["Oui.", "Non.", "Je ne sais pas.", "Je ne veux pas répondre.", "Je ne peux pas répondre."];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .addField("Question", question)
    .addField("Réponse", replies[result]);

    message.channel.send(ballembed)
  }

  if(command === `report`) {

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send(":question: **| Je n'ai pas trouvé l'utilisateur.  `nak-report <utilisateur> <raison>`**");
    let rreason = args.join(" ").slice(22);
    if(!rreason) return message.channel.send(":triangular_flag_on_post: **| Il faut rentrer une raison.  `nak-report <utilisateur> <raison>`**")

    let reportEmbed = new Discord.RichEmbed()
    .setAuthor("Reports", "https://cdn.discordapp.com/avatars/454695690279452673/7d9ad52fb90bafe78504311fec21da43.jpg?size=1024")
    .setColor("#e60000")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Date", message.createdAt)
    .addField("Raison", rreason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send(":question: **| Je n'ai pas trouvé le salon #reports ou bien je n'y ai pas accès.**");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
   }

  if(command === "botinfo") {
  	var embedbi = new Discord.RichEmbed()
  		.addField("Nom", "Nyfra#8113", true)
  		.addField("Créateur", "Naksu.#9907", true)
      .addField("Langage", "Node.js & JavaScript")
  		.setThumbnail("https://cdn.discordapp.com/avatars/454695690279452673/7d9ad52fb90bafe78504311fec21da43.jpg?size=1024")
  		.setColor("#e60000")
  	message.channel.send(embedbi)
  }

  if(command === "avatar") {
  	let user = message.mentions.users.first() || message.author;
  	let embedavatar = new Discord.RichEmbed()
    	.setColor("#e60000")
  		.setImage(user.displayAvatarURL)
  		.setAuthor(user.username)
    message.channel.send(embedavatar);
  }

  if(command === "help") {
  	message.channel.send(":notebook_with_decorative_cover: **| Liste des commandes envoyée en MP !**")
    var embed = new Discord.RichEmbed()
      .setDescription(help)
      .addField("Administration", adminCommand)
      .addField("Fun", funCommand)
    	.setColor("#e60000")
  		.setAuthor("Commandes", "https://cdn.discordapp.com/avatars/454695690279452673/7d9ad52fb90bafe78504311fec21da43.jpg?size=1024")
    message.author.send(embed);
    var lienembed = new Discord.RichEmbed()
      	.addField("Liens Utiles", liens)
      	.setColor("#e60000")
    message.author.send(lienembed)

}});

client.login(config.token);

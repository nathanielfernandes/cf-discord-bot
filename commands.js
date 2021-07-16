import { Embed, Member } from './src/types';
import { randint, randchoice } from './src/utils';


async function robert(interaction) {
  const quotes = await STUFF.get("quotes", { type: "json" });
  const quote = randchoice(quotes);
  var embed = new Embed({ description: quote, color: "random" });

  return interaction.reply({ embeds: [embed] });
};

async function egg(interaction) {
  const quotes = await STUFF.get("egg", { type: "json" });
  const quote = randchoice(quotes);
  var embed = new Embed({ description: quote, color: "random" });

  return interaction.reply({ embeds: [embed] });
};


async function vibe(interaction) {
  const words = await STUFF.get("words", { type: "json" });
  const emojis = await STUFF.get("emojis", { type: "json" });

  const embed = new Embed({ description: `${interaction.member.mention} your vibe checked out to be **${randchoice(words)}** ${randchoice(emojis)}`, color: "random" });

  return interaction.reply({ embeds: [embed] });
};


async function l(interaction) {
  const curL = parseInt(await STUFF.get("l", { type: "text" })) + 1;
  await STUFF.put("l", curL);

  const embed = new Embed({ description: `L Counter: **${curL}**`, color: "random" })

  return interaction.reply({ embeds: [embed] });
};

async function pp(interaction) {
  var embed = new Embed({ description: `**8${"=".repeat(randint(50))}D**`, color: "random" });
  embed.set_author({ name: `${interaction.member.username}'s pp size`, icon_url: interaction.member.avatar_url })

  return interaction.reply({ embeds: [embed] });
};

async function cat(interaction) {
  const resp = await fetch("https://aws.random.cat/meow");
  const cat = await resp.json();
  var embed = new Embed({ color: "random", image: cat.file });
  embed.set_footer({ text: "random cat :3" });

  return interaction.reply({ embeds: [embed] });
};


async function fortune(interaction) {
  const resp = await fetch("https://fortuneapi.herokuapp.com/");
  const fortune = await resp.json();
  var embed = new Embed({ description: `**${fortune}**`, color: "random" });
  embed.set_footer({ text: "random fortune 🔮" });

  return interaction.reply({ embeds: [embed] });
}


async function pfp(interaction) {
  var member;
  if (interaction.data.options !== undefined) {
    member = new Member({ user: interaction.data.resolved.users[interaction.data.options[0].value] });
  } else {
    member = interaction.member;
  }
  var embed = new Embed({ image: `${member.avatar_url}?size=1024`, color: "random" });
  embed.set_author({ name: `${member.fullname}'s pfp`, url: member.avatar_url });

  return interaction.reply({ embeds: [embed] });
}


async function get(interaction) {
  var soup;
  var URL;

  try {
    URL = interaction.data.options[0].value;
    const resp = await fetch(URL);
    try {
      const json = await resp.json();

      if (json !== undefined || json !== null) {
        soup = JSON.stringify(json, null, 1);
      } else {
        soup = "Invalid Response";
      }

    } catch (e) {
      URL = "ERROR";
      soup = "Could not get response."
    }
  } catch (e) {
    URL = "ERROR";
    soup = e.message;
  }

  var embed = new Embed({ description: "```yaml\n" + soup + "```", color: "random", title: URL });
  embed.set_author({ name: `GET request` });

  return interaction.reply({ embeds: embed });
}


export const command_mapping = {
  "pp": pp,
  "robert": robert,
  "vibe": vibe,
  "l": l,
  "cat": cat,
  "fortune": fortune,
  "pfp": pfp,
  "get": get,
  "egg": egg
}



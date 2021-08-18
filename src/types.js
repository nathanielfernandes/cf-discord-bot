import { InteractionCallbackType, MessageComponent, ButtonStyle, InteractionCallbackDataFlag, InteractionRequestType } from "./enums";

export class Member {
  constructor(member) {
    this.user = member.user;
    this.id = this.user.id;
    this.mention = `<@${this.id}>`;
    this.username = this.user.username;
    this.discriminator = this.user.discriminator;
    this.fullname = `${this.username}#${this.discriminator}`;
    this.avatar = member.avatar;
    this.avatar_url = `https://cdn.discordapp.com/avatars/${this.id}/${this.user.avatar}`;
    this.public_flags = this.user.public_flags;
    this.roles = member.roles;
    this.permissions = member.permissions;
    this.pending = member.pending;
    this.mute = member.mute;
    this.joined_at = member.joined_at;
    this.is_pending = member.is_pending;
    this.deaf = member.deaf;
  };
};

export class Interaction {
  constructor(interaction) {
    this.type = interaction.type;
    this.token = interaction.token;
    this.member = new Member(interaction.member);
    this.id = interaction.id;
    this.guild_id = interaction.guild_id;
    this.channel_id = interaction.channel_id;
    this.data = interaction.data;
    this.command_name = this.data.name;
    this.command_id = this.data.id;

    if (this.type === InteractionRequestType.MessageComponent) {
      this.action_rows = interaction.message.components;
    }
   
    this.component_id = this.data.custom_id;
    this.component_type = this.data.component_type;
  };

  edit({ content, embeds, components, ephemeral } = {}) {
    return {
      type: InteractionCallbackType.UpdateMessage,
      data: {
        "content": content,
        "embeds": embeds,
        "components": components,
        flags: (ephemeral) ? InteractionCallbackDataFlag.Ephemeral : 0,
        allowed_mentions: {
          parse: ["users", "roles"]
        }
      }
    }
  };


  reply({ content, embeds, components, ephemeral } = {}) {
    return {
      type: InteractionCallbackType.ChannelMessageWithSource,
      data: {
        "content": content,
        "embeds": embeds,
        "components": components,
        flags: (ephemeral) ? InteractionCallbackDataFlag.Ephemeral : 0,
        allowed_mentions: {
          parse: ["users", "roles"]
        }
      }
    }
  };
};


export class ActionRow {
  constructor({components} = {}) {
    this.components = components;
  }
    
  toJSON() {    
    return {
      type: MessageComponent.ActionRow,
      "components": this.components
    }
  }
}

export class Button {
  constructor({label, custom_id, style} = {}) {
    this.label = label;
    this.custom_id = custom_id;
    this.style = style;
  }
  toJSON() {    
    return {
      type: MessageComponent.Button,
      label: this.label,
      style: (this.style !== undefined) ? this.style : ButtonStyle.Primary,
      custom_id: (this.custom_id !== undefined) ? this.custom_id : "NO_ID"
    }
  }
}





export class Embed {
  constructor({ title, description, url, color, timestamp, thumbnail, image } = {}) {
    this.title = title;
    this.description = description;
    this.url = url;
    this.color = (color === "random") ? Math.floor(Math.random() * 16777215) : color;
    this.timestamp = timestamp;
    this.thumbnail = thumbnail;
    this.image = image;
    this.author;
    this.footer;
    this.fields;
  }

  set_author({ name, url, icon_url } = {}) {
    this.author = {};
    this.author["name"] = name;
    this.author["url"] = url;
    this.author["icon_url"] = icon_url;
  };

  set_footer({ text, icon_url } = {}) {
    this.footer = {};
    this.footer["text"] = text;
    this.footer["icon_url"] = icon_url;
  };

  add_field({ name, value, inline } = {}) {
    this.fields.push({ "name": name, "value": value, "inline": inline });
  };

  toJSON() {
    var tempData = {}
    if (this.title !== undefined) {
      tempData["title"] = this.title;
    }
    if (this.description !== undefined) {
      tempData["description"] = this.description;
    }
    if (this.url !== undefined) {
      tempData["url"] = this.url;
    }
    if (this.color !== undefined) {
      tempData["color"] = this.color;
    }
    if (this.timestamp !== undefined) {
      tempData["timestamp"] = this.timestamp;
    }
    if (this.image !== undefined) {
      tempData["image"] = { url: this.image };
    }
    if (this.thumbnail !== undefined) {
      tempData["thumbnail"] = { url: this.thumbnail };
    }
    if (this.footer !== undefined) {
      tempData["footer"] = this.footer;
    }
    if (this.author !== undefined) {
      tempData["author"] = this.author;
    }
    if (this.fields !== undefined) {
      tempData["fields"] = this.fields;
    }

    return tempData;
  };

};


export class Components {
  constructor(mapping = {}) {
    this.mapping = mapping;
  };

  async route(interaction) {
    var reply;
    if (interaction.component_id in this.mapping) {
      reply = await this.mapping[interaction.component_id](interaction);
    } else {
      reply = { type: InteractionCallbackType.ChannelMessageWithSource, data: { content: "This component has not been implemented yet!", flags: InteractionCallbackDataFlag.Emepheral}};
    };
    return new Response(JSON.stringify(reply), { status: 200, headers: { "Content-Type": "application/json" }});
  };

  add(command_name, command) {
    this.mapping[command_name] = command;
  };

}



export class Commands {
  constructor(mapping = {}) {
    this.mapping = mapping;
  };

  async route(interaction) {
    var reply;
    if (interaction.command_name in this.mapping) {
      reply = await this.mapping[interaction.command_name](interaction);
    } else {
      reply = { type: InteractionCallbackType.ChannelMessageWithSource, data: { content: "This command has not been implemented yet!", flags: InteractionCallbackDataFlag.Emepheral} };
    };
    return new Response(JSON.stringify(reply), { status: 200, headers: { "Content-Type": "application/json" } });
  };

  add(command_name, command) {
    this.mapping[command_name] = command;
  };

}
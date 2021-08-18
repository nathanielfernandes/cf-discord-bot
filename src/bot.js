import { Interaction, Commands, Components } from './types';
import { jsonResponse, errorResponse } from './utils';
import { InteractionRequestType, InteractionCallbackType } from "./enums";
const nacl = require('tweetnacl');

export class Bot {
  constructor(public_key, commands = undefined, components = undefined) {
    this.commands = new Commands(commands);
    this.components = new Components(components);
    this.public_key = public_key;
  }

  async validate(req) {
    const signature = String(req.headers.get('X-Signature-Ed25519'));
    const timestamp = String(req.headers.get('X-Signature-Timestamp'));
    const body = await req.text();

    return nacl.sign.detached.verify(
      Buffer.from(timestamp + body),
      Buffer.from(signature, "hex"),
      Buffer.from(this.public_key, "hex")
    );
  };


  async on_interaction(req) {
    try {
      const valid = await this.validate(req.clone());

      if (!valid) {
        return errorResponse(401);
      }

      const interaction = await req.json();

      // console.log(JSON.stringify(interaction));
      switch (interaction.type) {
        case InteractionRequestType.ApplicationCommand:
          return await this.commands.route(new Interaction(interaction));
        
        case InteractionRequestType.MessageComponent:
          return await this.components.route(new Interaction(interaction));

        case InteractionRequestType.Ping:
          return jsonResponse({ type: InteractionCallbackType.Pong });

        default:
          return errorResponse(400)
      }
    } catch (e) {
      console.error(e.stack)
      return errorResponse(500)
    }
  }
}
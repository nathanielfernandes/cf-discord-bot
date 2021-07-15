import { Interaction, Commands} from './types';
import { jsonResponse, errorResponse } from './utils';
import { InteractionRequestType, InteractionCallbackType } from "./enums";
const nacl = require('tweetnacl');

export class Bot {
    constructor(public_key, commands=undefined) {
        this.commands = new Commands(commands);
        this.public_key = public_key
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
        const valid = await this.validate(req.clone());

        if (!valid) {
          return errorsResponse(401);
        }
        try {
          const interaction = await req.json();
    
          switch (interaction.type) {
            case InteractionRequestType.APPLICATION_COMMAND:
              return await this.commands.route(new Interaction(interaction));
    
            case InteractionRequestType.PING:
              return jsonResponse({ type: InteractionCallbackType.PONG });
    
            default:
              return errorResponse(400)
          }
        } catch (e) {
          console.error(e.stack)
          return errorResponse(400)
        }
    }
}
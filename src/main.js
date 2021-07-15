// import { InteractionRequestType, InteractionCallbackType, Interaction, Commands} from './types';
// import { validate, jsonResponse, errorResponse } from './utils';
// import { commands } from "./commands";

// export var commands = new Commands();


// addEventListener("fetch", (event) => {
//   event.respondWith(
//     handleRequest(event.request).catch(
//       (err) => new Response(err.stack, { status: 500 })
//     )
//   );
// });

// async function handleRequest(req) {
//   const { pathname } = new URL(req.url);

//   if (pathname.startsWith("/interactions")) {
//     const valid = await validate(req.clone());

//     if (!valid) {
//       return errorsResponse(401);
//     }
//     try {
//       const interaction = await req.json();

//       switch (interaction.type) {
//         case InteractionRequestType.APPLICATION_COMMAND:
//           return await commands.route(new Interaction(interaction));

//         case InteractionRequestType.PING:
//           return jsonResponse({ type: InteractionCallbackType.PONG });

//         default:
//           return errorResponse(400)
//       }
//     } catch (e) {
//       console.error(e.stack)
//       return errorResponse(400)
//     }

//   }
//   return errorResponse(401)
// }
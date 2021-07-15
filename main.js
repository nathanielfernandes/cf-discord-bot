import { Bot } from "./src/bot"
import { command_mapping } from "./commands"

addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => {
        console.log(err.stack);
        console.log(err.message);
        return new Response(err.stack, { status: 500 })
      } 
    )
  );
});

async function handleRequest(req) {
  const { pathname } = new URL(req.url);

  if (pathname.startsWith("/interactions")) {
      
    const PUBLIC_KEY = await ENV.get("PUBLIC_KEY", {type: "text"});
    var bot = new Bot(PUBLIC_KEY, command_mapping)

    return await bot.on_interaction(req)
  };
  return errorResponse(401)
}
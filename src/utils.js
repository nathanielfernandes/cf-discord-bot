export const HEADERS = { "Content-Type": "application/json" };

export const errorResponse = (status) => new Response(null, { headers: HEADERS, "status": status });
export const jsonResponse = (data) => new Response(JSON.stringify(data), { headers: HEADERS });

export const randint = (max) => { return Math.floor(Math.random() * max) };
export const randchoice = (array) => { return array[Math.floor(Math.random() * array.length)] }

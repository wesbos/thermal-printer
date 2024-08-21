"use server";
import { headers } from 'next/headers';
import { checkSWF } from './sfw';
import { client, encoder } from './printer';
import { revalidatePath } from 'next/cache';

let count = 0;

const rateLimit = new Map();

export async function printMessage(prevState, data: FormData) {
  const ip = headers().get("x-forwarded-for") || headers().get("x-real-ip");
  const lastRequest = rateLimit.get(ip);
  if (lastRequest && Date.now() - lastRequest < 5000) {
    console.log("Rate limited");
    return {
      body: "Rate limited",
    };
  }

  rateLimit.set(ip, Date.now());
  const message = (data.get("message") || '').slice(0, 50);
  const screenName = (data.get("name") || '').slice(0, 25);

  console.log("Printing message", data.get("message"));
  let result = await checkSWF(message);
  const printedMessage = result.score > 0.85 ? `REDACTED! Toxic score of ${Math.round(result.score * 100)}%` : message;
  if (result.score > 0.85) {
    console.log('💀', result.score, message);
    return {
      body: printedMessage,
    }
  }
  const encodedMessage = encoder
    .initialize()
    .bold()
    .invert()
    .text(` ${screenName}:`)
    .invert(false)
    .bold(false)
    .text(` ${printedMessage}`)
    .newline()
    .encode();
  client.write(encodedMessage);
  count++;

  revalidatePath('/chat');
  return {
    body: `Printed message: ${printedMessage}`,
    name: screenName,
  };
}

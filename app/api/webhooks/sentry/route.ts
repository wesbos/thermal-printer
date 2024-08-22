import { takeScreenshot } from '@/actions/screenshot';
import { writeFile } from 'fs/promises';

export async function POST(request: Request) {
  console.log(`[🔔 WEBHOOK] GET request received`);
  // convert the request to an object so we can play it back later
  const body = await request.json();
  if(body)  {
    writeFile(`./requests/${Date.now()}.json`, JSON.stringify(body, null, 2));
  }

  console.log(body);
  await takeScreenshot(body.data.issue.id);
  return new Response('OK');

 }

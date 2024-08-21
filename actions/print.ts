"use server";
import { client } from '@/lib/printer';
import { loadImage } from 'canvas';
import EscPosEncoder from 'esc-pos-encoder';
const encoder = new EscPosEncoder();

export async function testPrinter(formData: FormData) {
  console.log('testng printer');

  let result = encoder
    .initialize()
    .text(`Testing ${new Date()}`)
    .newline()
    .encode();

  client.write(result);
}


export async function printImage(base64String: string) {
  console.log('printing image');
  const image = await loadImage(base64String);
  let result = encoder
  .initialize()
  .image(image, image.width, image.height, 'floydsteinberg')
  .encode();
  client.write(result);
}

export async function cutPaper() {
  let result = encoder
    .newline()
    .newline()
    .newline()
    .newline()
    .newline()
    .cut('full')
    .encode();
  client.write(result);
}

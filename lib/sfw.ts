"use server";
// import { pipeline } from "@xenova/transformers";
import PipelineSingleton from './pipeline';

export async function checkSWF(message: string) {
  // let classifier = await pipeline(
  //   "sentiment-analysis",
  //   "Xenova/toxic-bert"
  // );
  const classifier = await PipelineSingleton.getInstance();
  let [result] = await classifier(message);
  return result;
}


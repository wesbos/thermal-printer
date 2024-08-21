import Chat from "@/components/Chat";
import { ChatForm } from "@/components/ChatForm";
import { PhotoBooth } from "@/components/PhotoBooth";
import TestPrinter from "@/components/Test";
import Image from "next/image";

export default function Home() {
  return (
    <main className="text-center p-[50px]">
      <h2 className="text-2xl">JavaScript Thermal Printer!</h2>
      <p>Type something and it will print on my computer</p>
      <div className="grid gap-4 m-4 md:grid-cols-2">
        <div>
          <p className="text-center">Send a Photo</p>
          <PhotoBooth />
        </div>
        <div>
          <p className="text-center">Send a message</p>
          <Chat />
        </div>
      </div>
      <p>
        THANKS EVERYONE{" "}
        <a target="_blank" href="https://x.com/wesbos/status/1825559690216132726">
          [Photo Results]
        </a>
        <a target="_blank" href="https://x.com/wesbos/status/1826234351740240248">
          [Text Results]
        </a>
      </p>
      {/* <TestPrinter/> */}
      {/* <PhotoBooth /> */}
    </main>
  );
}


import Chat from "@/components/Chat";
import { PhotoBooth } from "@/components/PhotoBooth";

export default function Page() {
  return (
    <div>
      <h1>Chat</h1>

      <div className="grid gap-4 m-4 md:grid-cols-2">
        <div>
          <p className="text-center">Send a Photo!</p>
          <PhotoBooth />
        </div>
        <div>
          <p className="text-center">Send a message</p>
          <Chat/>
        </div>
      </div>
    </div>
  );
}

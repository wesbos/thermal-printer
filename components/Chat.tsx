import { client, encoder } from "@/lib/printer";
import { checkSWF } from "@/lib/sfw";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { ChatForm } from "./ChatForm";


export default function Chat() {
  return (
    <div>
      <ChatForm />
    </div>
  );
}

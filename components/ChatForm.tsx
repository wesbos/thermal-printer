"use client";

import { printMessage } from "@/lib/chat";
import { useActionState } from "react";

export function ChatForm() {
  const [state, formAction] = useActionState(printMessage, {});
  return (
    <form action={formAction}>
      <input
        placeholder="Name"
        type="text"
        name="name"
        required
        maxLength={25}
        defaultValue={state.name || ""}
      />
      <input
        placeholder="Message. Be nice, AI will judge"
        type="text"
        name="message"
        id="message"
        maxLength={50}
      />
      <button type="submit">Send</button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </form>
  );
}

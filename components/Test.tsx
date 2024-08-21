"use client";

import { testPrinter } from "@/actions/print";

export default function TestPrinter() {
  return (
    <main>
      <h2>Thermal Test!</h2>

      <form action={testPrinter}>
        <button type="submit">Test Print</button>
      </form>
    </main>
  );
}

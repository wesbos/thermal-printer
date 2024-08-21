Thermal printer controlled with JavaScript using ESC/POS and TCP sockets.

### Important Bits:

1. The printed connection is done in `./lib/printer.ts`
2. The Photobooth printing is done in `./actions/print.ts` and the UI is in `./components/PhotoBooth.tsx`
3. The Chat printing is done in `./lib/chat.ts`, the AI "Toxic message" detection in `./lib/sfw.ts` and the UI in `./components/ChatForm.tsx`.
4. THe Sentry issue + screenshotting is done in `./lib/sentry.ts`

I'm using a [Rongta 80mm](https://amzn.to/3SXqX94) Receipt printer, but almost any one will do as they all operate on ESC/POS. I am hard wired ethernet, but many of them connect over USB, Serial, Wifi and bluetooth.

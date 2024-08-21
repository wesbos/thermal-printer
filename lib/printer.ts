import net from 'node:net';
import EscPosEncoder from 'esc-pos-encoder';

// ESCPOS command to print "Hello, World!"
const printData = Buffer.from([
  0x1B, 0x40,        // Initialize printer
  0x1B, 0x21, 0x30,  // Select character size
  0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x2C, 0x20, 0x57, 0x6F, 0x72, 0x6C, 0x64, 0x21, 0x0A, // "Hello, World!\n"
]);

const PORT = 9100; // Most printers use port 9100
const HOST = '192.168.1.87'; // The IP address of the printer, I got this by holding the feed button on the printer while turning it on

const printerClientSingleton = () => {
  console.log('Creating new socket...');
  return new net.Socket();
}

// This singleton pattern is used to ensure that the client is only created once and reused across hot reloads in Next.js
export const client = globalThis.printerClientGlobal ?? printerClientSingleton();
if (process.env.NODE_ENV !== 'production') globalThis.printerClientGlobal = client


console.log('[🧾 THERMAL] Checking if printer is connected...', client.readyState);
if (client.readyState !== 'open') {
  console.log('[🧾 THERMAL] Connecting for the first time!');
  client.connect(PORT, HOST, () => {
    console.log('[🧾 THERMAL] Connected to printer');
  });
}

client.on('data', (data) => {
  console.log('[🧾 THERMAL] Received:', data.toString('hex'));
});

client.on('error', (err) => {
  console.error('[🧾 THERMAL] Error connecting to printer:', err);
});

client.on('close', () => {
  console.log('[🧾 THERMAL] Disconnected from printer');
});

const socketEvents = ['close',
  'connectionAttempt',
  'connectionAttemptFailed',
  'connectionAttemptTimeout',
  'drain',
  'end',
  'lookup',
  'ready',
  'timeout'];

socketEvents.forEach((event) => {
  client.on(event, (data) => {
    console.log('[🧾 THERMAL] Event:', event);
  });
});


declare const globalThis: {
  printerClientGlobal: ReturnType<typeof printerClientSingleton>;
} & typeof global;


export const encoder = new EscPosEncoder();

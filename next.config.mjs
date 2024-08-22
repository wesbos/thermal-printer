/** @type {import('next').NextConfig} */
const nextConfig = {
  // (Optional) Export as a standalone site
  // See https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
  output: "standalone", // Feel free to modify/remove this option

  // Indicate that these packages should not be bundled by webpack
  experimental: {
    webpackBuildWorker: false, // https://github.com/vercel/next.js/issues/65350
    serverComponentsExternalPackages: ["sharp", "onnxruntime-node"],
  },
};
export default nextConfig;

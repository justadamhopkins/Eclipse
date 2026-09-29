/**
 * Mirrors the `StaticImageData` shape Next.js provides for static image imports,
 * so `next/image` receives the `width` and `height` it requires under Vitest.
 */
const staticImageMock = {
  src: '/mock-static-image.svg',
  width: 24,
  height: 24,
};

export default staticImageMock;

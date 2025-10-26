import Document from "./Document.js";

export const mockDocument = new Document();

if (typeof window !== "undefined") {
  window.mockDocument = mockDocument; // handy for DevTools
}

export default mockDocument;

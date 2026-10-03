// src/index.ts
function greet(name) {
  return `Hello from private library, ${name}!`;
}
var VERSION = "1.0.0";
export {
  VERSION,
  greet
};

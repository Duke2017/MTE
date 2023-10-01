//Creates and returns a pseudo-unique ID.
let iIdCounter = 0;
export function uid() {
  return "id-" + new Date().valueOf() + "-" + iIdCounter++;
};
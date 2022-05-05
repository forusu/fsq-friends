export function getRndFloat(min, max) {
  return Math.random() * (max - min) + min;
}

export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

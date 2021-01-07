/**
 * Source: https://medium.com/@pppped/compute-an-arbitrary-color-for-user-avatar-starting-from-his-username-with-javascript-cd0675943b66
 */
export function stringToHslColor(str: string, s = 50, l = 45) {
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
}

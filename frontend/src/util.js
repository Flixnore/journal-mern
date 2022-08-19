export function create_bites_string(str) {
  if (str === "") return "";
  let a = str.split(" ");
  let bites = {};
  // for each bite, check if it has a colon, if so, split on that colon and add to the bites array
  for (let i = 0; i < a.length; i++) {
    if (a[i].includes(":")) {
      let newBites = a[i].split(":");
      bites[newBites[0]] = newBites[1];
    } else {
      if ("words" in bites) {
        bites["words"] += " " + a[i];
      } else {
        bites["words"] = a[i];
      }
    }
  }
  // reduce the bites array to a string of the form "key1=value1&key2=value2"
  let bites_string = Object.keys(bites).reduce((acc, key) => {
    return acc + `${key}=${bites[key]}&`;
  }, "?");

  return bites_string;
}

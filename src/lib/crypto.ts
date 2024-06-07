// https://stackoverflow.com/a/68141794
export async function sha256(string: string) {
  const buffer = str2ab(string);
  const bytes = await window.crypto.subtle.digest("SHA-256", buffer);
  return [...new Uint8Array(bytes)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

// https://stackoverflow.com/a/11058858
function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

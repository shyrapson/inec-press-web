import axios from "axios";

const secretKey = "iueyewirghcbhbchjvcgcbchsysfueie";

async function encryptData(
  data: { ENCRYPTION_KEY: string },
  secretKey: string
) {
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secretKey),
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: iv },
    key,
    enc.encode(JSON.stringify(data))
  );
  return {
    iv: Array.from(iv),
    encryptedData: Array.from(new Uint8Array(encrypted)),
  };
}

export const downloadApp = async () => {
  //   const apkUrl = "/INECPRES.apk";
  //   window.location.href = apkUrl;
  const data = { ENCRYPTION_KEY: "kshbjhdvghdvgvdgdvdhkjsdbjk" };
  const encryptedData = await encryptData(data, secretKey);

  try {
    const url =
      "https://inec-croms-bucket.nyc3.digitaloceanspaces.com/apk-file/INECPRES.apk";
    console.log("Request URL:", url);

    const response = await axios.post(
      url,
      {
        data: encryptedData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("response", response);
  } catch (error) {
    console.error("Error:", error);
  }
};

const fs = require("fs");
const minimist = require("minimist");
const path = require("path");
const WebCrypto = require("node-webcrypto-ossl");
const axios = require("axios");
const FormData = require("form-data");

let form = new FormData();
const webcrypto = new WebCrypto();

const argv = minimist(process.argv.slice(2));
const filename = argv._[0];
const filePath = path.join(__dirname, filename);
const host = "http://localhost:1234";

axios
  .get(`${host}/mkdir`)
  .then(res => {
    let fullPath = `${host}${res.request.path}`;
    encryptFile()
      .then(data => {
        form.append("f", data.buffer, filename);
        axios
          .post(fullPath, form, {
            headers: form.getHeaders()
          })
          .then(res => {
            console.log(`${fullPath}#${data.hash}`);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  })
  .catch(error => {
    console.error(error);
  });

const encryptFile = async () => {
  const key = await webcrypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256
    },
    true,
    ["encrypt", "decrypt"]
  );
  const keydata = await webcrypto.subtle.exportKey("jwk", key);
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(filePath, (error, data) => {
        if (error) {
          throw error;
        } else {
          const iv = webcrypto.getRandomValues(new Uint8Array(12));
          webcrypto.subtle
            .encrypt(
              {
                name: "AES-GCM",
                iv: iv
              },
              key,
              data
            )
            .then(encryptedFile => {
              let buffer = Buffer.concat([
                Buffer.from(iv.buffer),
                Buffer.from(encryptedFile)
              ]);
              resolve({
                buffer,
                hash: keydata.k
              });
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    } catch (error) {
      console.error(error);
    }
  });
};

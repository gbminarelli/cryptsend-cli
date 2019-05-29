const fs = require("fs");
const path = require('path');
const WebCrypto = require("node-webcrypto-ossl");
const axios = require("axios");
const FormData = require("form-data");

let form = new FormData();
const webcrypto = new WebCrypto();

const host = "https://cryptsend.io";

const upload = (filePath) => {
  axios
    .get(`${host}/mkdir`)
    .then(res => {
      let fullPath = `${host}${res.request.path}`;
      encryptFile(filePath)
        .then(data => {
          form.append("f", data.buffer, path.basename(filePath));
          axios
            .post(fullPath, form, {
              headers: form.getHeaders()
            })
            .then(res => {
              console.log(`Here's the link to your encrypted file, only share it with people you trust! 
${fullPath}#${data.hash}`);
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
}

const encryptFile = async (filePath) => {
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

exports.upload = upload;
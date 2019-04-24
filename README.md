# cryptsend-cli

A simple CLI for [CryptSend](https://github.com/countable-web/cryptsend)

## Getting Started

1. Grab the repo:

```
git clone https://github.com/gbminarelli/cryptsend-cli.git
```

2. Install the project's dependencies:

```
cd cryptsend-cli
npm install
```

3. If you want to run your own server, make sure you have the latest version of [CryptSend](https://github.com/countable-web/cryptsend) **running locally** on your machine.

## Usage

You can upload the encrypted files to your own version of CryptSend (installed locally) or to CryptSend's server:

1. Encrypt and upload a file using the CLI:

* Local server:

```
npm run cryptsend-local <FILE_PATH>
```
* CryptSend's server:

```
npm run cryptsend <FILE_PATH>
```

2. Grab the generated URL and open it in your browser.

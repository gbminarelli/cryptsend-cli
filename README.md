# cryptsend-cli

A simple CLI for [CryptSend](https://github.com/countable-web/cryptsend)

## Getting Started

1. Grab the repo:

```
git clone https://github.com/gbminarelli/cryptsend-cli.git
```

2. Install cryptsend-cli globally:

```
npm install -g cryptsend-cli
```

## Usage

You can upload the encrypted files to CryptSend's server by simply passing the file's path (absolute or relative) to cryptsend:


```
cd ~/Pictures/
cryptsend mypicture.jpg
```
```
cryptsend /home/gian/Pictures/mypicture.jpg
```
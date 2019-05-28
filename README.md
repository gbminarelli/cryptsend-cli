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

You can upload the encrypted files to CryptSend's server by simply navigating to the file's folder and passing the file's name to cryptsend:


```
cd ~/Pictures/
cryptsend mypicture.jpg
```

Alternatively you can pass the absolute path to the file using the **-a** (or **--absolute**) flag:


```
cryptsend -a ~/Pictures/mypicture.jpg
```


```
cryptsend --absolute ~/Pictures/mypicture.jpg
```
<p align="center">
  <a href="https://avatar.microvoid.io/">
    <img width="20%" src="https://avatar.microvoid.io/api/avatar/retro-avatar?t=gravatar" alt="retro-avatar" />
    <img width="20%" src="https://avatar.microvoid.io/api/avatar/retro-avatar?t=window" alt="retro-avatar" />
    <img width="20%" src="https://avatar.microvoid.io/api/avatar/retro-avatar?t=github" alt="retro-avatar" />
    <h1 align="center">retro-avatar</h1>
  </a>
</p>

<p align="center">
  Create <em>indenticon-like</em> like Github and Gravatar (retro) avatars.<br><br>
  <a href="https://www.npmjs.com/package/retro-avatar">
    <img src="https://img.shields.io/npm/dm/retro-avatar.svg?style=flat-round" alt="npm downloads">
  </a>
  <a href="https://www.npmjs.com/package/retro-avatar">
    <img alt="NPM Version" src="https://badgen.net/npm/v/retro-avatar" />
  </a>
  <a href="https://github.com/microvoid/retro-avatar/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/retro-avatar?style=flat" alt="License">
  </a>
</p>

# Features

- Generate distinctive images for each user, enhancing recognizability.
- Intuitive and easy to recognize.
- Supports various themes.
- All style options can be changed.

# Documentation

For full documentation, visit [website](https://avatar.microvoid.io/)

# Quick Start

You don't need to install any dependencies!

Just replace the `ID_HERE` placeholder with any text.

```
<img src="https://avatar.microvoid.io/api/avatar/ID_HERE" />
```

for example:


- UserName: [https://avatar.microvoid.io/api/avatar/youking-lib](https://avatar.microvoid.io/api/avatar/youking-lib)

- UserId: [https://avatar.microvoid.io/api/avatar/user-id-xxxx](https://avatar.microvoid.io/api/avatar/user-id-xxxx)

- UserEmail: [https://avatar.microvoid.io/api/avatar/whistleyz@163.com](https://avatar.microvoid.io/api/avatar/whistleyz@163.com)

- ProjectName: [https://avatar.microvoid.io/api/avatar/retro-avatar](https://avatar.microvoid.io/api/avatar/retro-avatar)

# Options

## Themes

| theme | usage | demo |
| ---- | ---- | ---- |
| github | https://avatar.microvoid.io/api/avatar/retro-avatar?t=github | ![retro-avatar](https://avatar.microvoid.io/api/avatar/retro-avatar?t=github&s=32)   |
| gravatar | https://avatar.microvoid.io/api/avatar/retro-avatar?t=gravatar | ![retro-avatar](https://avatar.microvoid.io/api/avatar/retro-avatar?t=gravatar&s=32)   |
| mono | https://avatar.microvoid.io/api/avatar/retro-avatar?t=mono | ![retro-avatar](https://avatar.microvoid.io/api/avatar/retro-avatar?t=mono&s=32)   |
| mini | https://avatar.microvoid.io/api/avatar/retro-avatar?t=mini | ![retro-avatar](https://avatar.microvoid.io/api/avatar/retro-avatar?t=mini&s=32)   |
| window | https://avatar.microvoid.io/api/avatar/retro-avatar?t=window | ![retro-avatar](https://avatar.microvoid.io/api/avatar/retro-avatar?t=window&s=32)   |
| mosaic | https://avatar.microvoid.io/api/avatar/retro-avatar?t=mosaic | ![retro-avatar](https://avatar.microvoid.io/api/avatar/retro-avatar?t=mosaic&s=32)   |

## Size

| size | usage | demo |
| ---- | ---- | ---- |
| 32 | https://avatar.microvoid.io/api/avatar/retro-avatar?s=32 | ![retro-avatar](https://avatar.microvoid.io/api/avatar/retro-avatar?s=32)   |
| 64 | https://avatar.microvoid.io/api/avatar/retro-avatar?s=64 | ![retro-avatar](https://avatar.microvoid.io/api/avatar/retro-avatar?s=64)   |

The size must be between 16 and 2048, and default to 256.

# Projects

- https://avatar.marktion.cn/ Chinese mirrors enhance the access speed in this area.

# Self host

1. prerequires

retro-avatar rely on the node-canvas project, so you need to install its dependencies on your server.

**for Ubuntu**

```shell
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

**for Fedora**

```shell
sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
```

For other environments, please refer to [node-cavas](https://github.com/Automattic/node-canvas).

2. clone project

```shell
git clone https://github.com/microvoid/retro-avatar.git
```

3. deploy

```shell
sh deploy.sh
```

4. environment variables (unnecessary)

```shell
# path: retro-avatar/apps/website/.env

# Google Analytics
NEXT_PUBLIC_ANALYTICS_ID=

# Logflare API
LOGFLARE_API_KEY=
LOGFLARE_API_TOKEN=
```

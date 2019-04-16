# Circles Mobile [![Build Status](https://travis-ci.org/CirclesUBI/circles-mobile.svg?branch=master)](https://travis-ci.org/CirclesUBI/circles-mobile) [![Chat Server](https://chat.joincircles.net/api/v1/shield.svg?type=online&name=circles%20chat)](https://chat.joincircles.net) [![Backers](https://opencollective.com/circles/supporters/badge.svg)](https://opencollective.com/circles) [![Follow Circles](https://img.shields.io/twitter/follow/circlesubi.svg?label=follow+circles)](https://twitter.com/CirclesUBI) [![Circles License](https://img.shields.io/badge/license-APGLv3-orange.svg)](https://github.com/CirclesUBI/circles-mobile/blob/master/LICENSE)

Circles is a blockchain-based Universal Basic Income implementation.

[Website](http://www.joincircles.net) // [Whitepaper](https://github.com/CirclesUBI/docs/blob/master/Circles.md) // [Chat](https://chat.joincircles.net)

## Setup

```sh
# set up submodules
git clone
git submodule update --init

# install
npm install

# install contracts
cd contracts
npm install

# set up blockchain
npm run ganache

# deploy contracts
npx truffle compile
npx truffle migrate --reset --compile-all

# use truffle console
npx truffle console
> let hf = await HubFactory.deployed()
> let s = await hf.spawn(1736111111111111, 0, 18, 'CRC', 3600, 100)
```

### Android / iOS
See the relevant section here: https://docs.expo.io/versions/latest/expokit/expokit/

### Extra Android Steps
Update `.\android\app\src\main\java\host\exp\exponent\generated\DetachBuildConstants.java` with your expo packager address (Which is displayed when you run `expo start`):

`public static final String DEVELOPMENT_URL = "<expo packager address>"`

Update `.\android\local.properties` with the location of your sdk on disk, mine is:

`sdk.dir=e\:\\Users\\username\\AppData\\Local\\Android\\Sdk`

Also, I had a build error with a missing file `shell-app-manifest.json`, so I just copied the file in the same folder `kernel-manifest.json` and renamed it. Not sure what this might mean.

## Development
```sh

# Build the Android Studio / XCode project.

# start expo packager
expo start
# Press 'a' or 'i' (?) to open in Android / iOS emulator

# Hotreloading should work when saving files in the `lib` folder.
```

### Environment Variables
Get in touch with @ana0 or @edzillion to request these env vars.

```sh
# Cognito
USER_POOL_ID=
USER_POOL_CLIENT_ID=
IDENTITY_POOL_ID=

# Api Endpoints
API_USER_ENDPOINT=
API_ORG_ENDPOINT=
API_RELAYER_ENDPOINT=

# Blockchain
HUB_ADDRESS=
RELAY_ADDRESS=
RPC_URL=

# AWS Credentials
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# Other 
TRAVIS_BUILD_NUMBER=
EXPO_DEBUG=
S3_BUCKET=
```

### Node Version

We use the `.nvmrc` file to manage the version of node. You can use
[avn](https://github.com/wbyoung/avn) to automatically switch to the appropriate
node version.

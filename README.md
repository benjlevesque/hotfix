# Hotfix

Creates a branch with chosen cherry-picked commits and creates a tag with them.

This utility doesn't cover the release process, it expects the tag to trigger a release.


## Requirements
This utility depends on the [git](https://git-scm.com/) and [gh](https://cli.github.com/) CLIs

## Installation

This package is not published at the moment, for now it can be installed like this: 
```
git clone https://github.com/benjlevesque/hotfix
cd hotfix
yarn build
npm link
```

## Usage

To cherry pick commit `abcde12` and push a tag `1.2.1`, based on previous release `1.2.0`, run the following command:
```bash
hotfix abcde12 --tag 1.2.0
```

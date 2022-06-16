# Hotfix

Creates a branch with chosen cherry-picked commits and creates a tag with them.

This utility doesn't cover the release process, it expects the tag to trigger a release.


## Usage

To cherry pick commit `abcde12` and push a tag `1.2.1`, based on previous release `1.2.0`, run the following command:
```bash
hotfix abcde12 --tag 1.2.0
```

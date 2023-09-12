import { exec, execSync } from "child_process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { SemVer } from "semver";

yargs(hideBin(process.argv))
  .command(
    "$0 <hashes..>",
    "",
    (y) =>
      y
        .positional("hashes", {
          desc: "The sha1 of the commit to cherry-pick",
          type: "string",
          array: true,
          demandOption: true,
        })
        .option("fromTag", {
          type: "string",
          demandOption: true,
          desc: "The existing tag to apply the fix on",
        }),
    ({ fromTag, hashes }) => {
      const currentBranch = execSync(
        `git rev-parse --abbrev-ref HEAD`
      ).toString();
      const newTag = new SemVer(fromTag).inc("patch").format();
      const branchName = `hotfix-${newTag}`;
      try {
        execSync(`git checkout ${fromTag}`);
        execSync(`git checkout -b ${branchName}`);
        for (const hash of hashes) {
          execSync(`git cherry-pick ${hash}`);
        }
        execSync(`git push origin ${branchName}`);
        execSync(`git tag ${newTag}`);
        execSync(`git push --tags`);
        execSync(`gh release create ${newTag} --target ${branchName} --generate-notes`);
      } catch (e) {
        console.error(e.toString());
      } finally {
        execSync(`git checkout ${currentBranch}`);
        execSync(`git branch -D ${branchName}`);
      }
    }
  )
  .demandCommand().argv;

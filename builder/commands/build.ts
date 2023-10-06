// import * as fse from 'fs-extra';
// import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';


const main = async () => {
  if (process.argv.length <= 2) {
    throw new Error(
      'Please pass the one of the following values gateway,core,plugin !!!'
    );
  }

  const erxesDir = path.resolve(__dirname, '..', 'erxes');

  fs.rmSync(erxesDir, { recursive: true, force: true });
  fs.mkdirSync(erxesDir);
  fs.mkdirSync(`${erxesDir}/packages`);

  const type = process.argv[2];
  let folderName = type;

  if (type === 'plugin') {
    if (process.argv.length <= 3) {
      throw new Error('Please pass plugin name !!!');
    }

    folderName = `plugin-${process.argv[3]}-api`;
  }

  fs.cpSync('../packages/api-utils', `${erxesDir}/packages/api-utils`, { recursive: true });
  fs.cpSync('../packages/tsconfig.api.jsonc', `${erxesDir}/packages/tsconfig.api.jsonc`);
  fs.cpSync(`../packages/${folderName}`, `${erxesDir}/packages/${folderName}`, { recursive: true });
  fs.cpSync('../yarn.lock', `${erxesDir}/yarn.lock`);
  fs.writeFileSync(`${erxesDir}/package.json`, JSON.stringify({
    name: `erxes`,
    private: true,
    workspaces: [
      "packages/*"
    ],
  }))


  process.chdir(erxesDir);

  execSync(`yarn install`);
  execSync(`yarn workspaces run build`);

  execSync(`cp -RT ./packages/api-utils/dist ./packages/api-utils/src`);
  execSync(`cp -RT ./packages/${folderName}/dist ./packages/${folderName}/src`);

  execSync(`rm -rf node_modules ./packages/api-utils/node_modules ./packages/${folderName}/node_modules ./packages/api-utils/dist ./packages/${folderName}/dist`);

  execSync('yarn install --production');
};

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });

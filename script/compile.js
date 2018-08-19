const glob = require('glob');
const path = require('path');

/**
 * 各component module を全て root配下に展開し
 * 利用側で import Module from 'ts-react-library/lib/dir/module' 形式で呼べるようにする
 * @param rootPath
 * @param dir
 * @returns {{}}
 */
const loader = (rootPath) => {
  const basePath = path.resolve(rootPath, 'src/');
  const targets = glob.sync(`${basePath}/**/*`);

  const entries = {};

  targets.forEach(value => {
    const re = new RegExp(`${basePath}/`);
    let key = `${value.replace(re, '')}`;

    // TODO: サポートされていない正規表現 サポートされたら変える
    //if (! key.match( /(?!.stories)\.(tsx|ts)$/)) return;

    // storybook以外のts tsx
    if ( key.match(/.stories./)) return;
    if (! key.match(/\.(ts|tsx)$/)) return;

    // test ディレクトリは対象外
    if (key.match(/__test__/)) return;

    // 拡張子を削除 して 全て js変換
    key = key.replace(/\.(ts|tsx)$/, '') + '.js';

    entries[key] = value;
  });

  console.log(entries)

  return entries;
};


module.exports = (rootPath) => {
  // package entry point
  let entry = {
    'index.js': path.resolve(rootPath, 'src/index.ts')
  };

  entry = Object.assign(entry, loader(rootPath))

  return entry
};
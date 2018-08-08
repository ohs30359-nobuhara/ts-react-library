const glob = require('glob');
const path = require('path');

/**
 * 各component module を全て root配下に展開し
 * 利用側で import Module from 'react-atoms/lib/dir/module' 形式で呼べるようにする
 * @param rootPath
 * @param dir
 * @returns {{}}
 */
const loader = (rootPath, dir) => {
  const basePath = path.resolve(rootPath, 'src/');
  const targets = glob.sync(`${basePath}/${dir}/*`);

  const entries = {};

  targets.forEach(value => {
    const re = new RegExp(`${basePath}/${dir}/`);
    const key = `${dir}/${value.replace(re, '')}`;
    entries[key] = value;
  });

  return entries;
};


module.exports = (rootPath) => {

  // dist対象ディレクトリ
  const distConfig = [
    'components',
  ];

  // package entry point
  let entry = {
    'index': path.resolve(rootPath, 'src/index.ts')
  };

  distConfig.forEach(config => {
    entry = Object.assign(entry, loader(rootPath, config))
  });

  return entry
};

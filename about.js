const openAboutWindow = require('about-window').default;
const path = require('path');

const create = () =>
  openAboutWindow({
    product_name: '倒计时',
    icon_path: path.join(__dirname, 'icon.png'),
    package_json_dir: path.resolve(__dirname, './'),
    copyright: 'Copyright (c) 2020 徐梦宇',
    homepage: 'https://github.com/tuzilow',
  });

module.exports = { create };

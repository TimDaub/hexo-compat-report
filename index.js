// @format
const ejs = require("ejs");
const fs = require("hexo-fs");
const render = require("./kumascript/src/render");
const Templates = require("./kumascript/src/templates");
const config = require("./kumascript/src/config");

// Resources:
// - https://github.com/hexojs/hexo/issues/2874#issuecomment-355675749
// - https://github.com/m80126colin/hexo-tag-owl/blob/master/lib/index.js#L26
// - https://hexo.io/api/tag#Async-Rendering
hexo.extend.tag.register(
  "compat",
  async function(args) {
    const tag = args[0];
    const s = `{{Compat("${tag}")}}`;
    const templates = new Templates(config.macrosDirectory);
    let [res, err] = await render(s, templates, {});
    if (err) throw err;
    return res;
  },
  { async: true }
);

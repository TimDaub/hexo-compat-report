// @format
const fs = require("hexo-fs");
const render = require("./kumascript/src/render");
const Templates = require("./kumascript/src/templates");
const config = require("./kumascript/src/config");
const sass = require("node-sass");
const path = require("path");
const inliner = require("sass-inline-svg");
const _escape = require("lodash.escape");

const paths = {
  styles: [
    `${__dirname}/kuma/kuma/static/styles/wiki-compat-tables.scss`,
    `${__dirname}/stumptown-renderer/client/src/document/ingredients/browser-compatibility-table/bcd.scss`
  ],
  icons: `${__dirname}/stumptown-renderer/client/src/document/ingredients/browser-compatibility-table/`
};

hexo.extend.tag.register(
  "compat",
  async function(args) {
    const tag = args[0];
    const s = `{{Compat("${tag}")}}`;
    const templates = new Templates(config.macrosDirectory);
    let [table, err] = await render(s, templates, {
      $0: tag,
      locale: "en-US"
    });
    // NOTE: For some reason, err is an array.
    if (err.length) throw new Error("Compatibility table rendering failed");
    const structure = sass.renderSync({
      file: path.normalize(paths.styles[0]),
      outputStyle: "compressed"
    });

    const aestetics = sass.renderSync({
      file: path.normalize(paths.styles[1]),
      functions: {
        url: inliner(path.normalize(paths.icons))
      },
      outputStyle: "compressed"
    });
    const doc = `
			<!doctype html>
				<head>
          <base href="https://developer.mozilla.org">
					<style>
            ${structure.css.toString()}
          </style>
					<style>
            ${aestetics.css.toString()}
          </style>
					<style>
             body {
               font-family: Arial;
             }
             .bc-table {
               background-color: white;
             }
          </style>
				</head>
				<body>
					${table}
				</body>
			</html>`;
    return `
        <iframe
          frameborder="0"
          seamless
          style="background-color:white;height:550px;transform:scale(0.5);width:200%;margin: -15% 0 -15% -50%;"
          srcdoc="${_escape(doc)}"></iframe>
      </div>
    `;
  },
  { async: true }
);

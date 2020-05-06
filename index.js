// @format
const fs = require("hexo-fs");
const render = require("./kumascript/src/render");
const Templates = require("./kumascript/src/templates");
const config = require("./kumascript/src/config");
const sass = require("node-sass");
const path = require("path");
const inliner = require("sass-inline-svg");

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
    const style = sass.renderSync({
      file: path.normalize(paths.styles[0]),
      outputStyle: "compressed"
    });

    const style2 = sass.renderSync({
      file: path.normalize(paths.styles[1]),
      outputStyle: "compressed",
      functions: {
        // NOTE: We convert all svgs to inline svgs
        url: inliner(path.normalize(paths.icons))
      }
    });
    const doc = `
			<!doctype html>
				<head>
          <base href="https://developer.mozilla.org">
          <style>body { background-color: "white"; font-family: x-locale-heading-primary,zillaslab,Palatino,"Palatino Linotype",x-locale-heading-secondary,serif }</style>
					<style>${style.css.toString()}</style>
					<style>${style2.css.toString()}</style>
				</head>
				<body>
					${table}
				</body>
			</html>`;
    return `
      <iframe src="about:blank">
        <body>
          <p>hello</p>
        </body>
      </iframe>
    `;
  },
  { async: true }
);

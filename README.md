# hexo-compat-table

> Renders an MDN compatibilit table on your hexo-generated page.

![A demo of hexo-compat-table](/assets/demo.png)

## Use case

When writing about front end web development, it's always nice being able to
refer to some up-to-date data about browser-compatibility of a certain feature.
The MDN Web Docs team has done a great job compiling all data into [a single
git repository](https://github.com/mdn/browser-compat-data). On MDN itself,
this data is then displayed in a
[`compat-report-table`](https://developer.mozilla.org/en-US/docs/MDN/Contribute/Structures/Compatibility_tables).

As I really like these tables and wanted to use them in one of my [blog
posts](https://timdaub.github.io/2020/02/19/wasm-synth/), I've simply decided
to *cut out* the functionality from the MDN platform and make it available to
all of my fellow hexo bloggers.

## Installation

```bash
$ npm i --save hexo-compat-report
```

and to include a table into your blog post, use the following syntax:

```
{% compat api.AudioWorklet %}
```

For the correct path, please refer to the [MDN
repository](https://github.com/mdn/browser-compat-data).

## Contributing

Any help or feedback is welcome. Check the issues for problems. I'll try to
merge PRs optimistically.

## Changelog

### 0.1.0

- Upgrade `mdn-browser-compat-data` to `@mdn` namespace

### 0.0.2

- Include installation guidance into `README.md`

### 0.0.1

- Release initial version with basic functionality

## License

MIT

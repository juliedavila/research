# Research

Open research briefs on software security, engineering practice and developer experience, published at <https://juliedavila.github.io/research/>.

Each brief is built from public sources by AI research agents and reviewed by a person before it is published. Every page says how it was made, grades its evidence and lists its sources. [How this research is made](https://juliedavila.github.io/research/about/) explains the method. To keep a copy, print the page from your browser; pages print in light colours with the navigation removed.

## How the site is built

- `entries/*.md` holds one brief per file: YAML front matter (title, kicker, dek, purpose, published, version), then Markdown. Conventions: `## Heading {#id}` sets an anchor; `> [!SYNTHESIS]`, `[!NOTE]`, `[!CAUTION]`, `[!RISK]` and `[!GAP]` open a callout; `[[term]]` marks a glossary term defined in the page's `dl.glossary`; `sources: inline` builds the Sources list from the links in the text.
- `bun build.ts` turns each entry into `docs/<slug>/index.html` with the vendored [html-house-style](https://github.com/juliedavila/html-house-style) kit in `kit/`, using the colours and fonts in `brand.json`, and fails if the kit's checker reports a failure.
- GitHub Pages serves `docs/` from the `main` branch.

```sh
bun install
bun build.ts
```

## License

Text: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Code (`build.ts`, `tools/`): MIT. The kit in `kit/` keeps its own MIT license.

# MMXLVIII

Let's play some 2048

See [requirements](./docs/Requirements.md) for what we are trying to achieve

Published to github pages at http://mmxlviii.ashishpandey.com to play in browser

## Development

[![Tests](https://github.com/ashishpandey/mmxlviii/actions/workflows/test.yml/badge.svg)](https://github.com/ashishpandey/mmxlviii/actions/workflows/test.yml)
[![Deploy](https://github.com/ashishpandey/mmxlviii/actions/workflows/deploy.yml/badge.svg)](https://github.com/ashishpandey/mmxlviii/actions/workflows/deploy.yml)

Built using **_React + TypeScript + Vite_**

built and tested with nodejs 24+, npm 11+, chrome 145+

### Running locally

* `npm run dev`
* game is available at `http://localhost:5173`

### AI hint system

Can use hints from an LLM, via openrouter

Currently, this only works when running with a OpenRouter API key locally. To enable:
* create a `.env` file in project root. see [sample.env](./sample.env) for inspiration
* run local instance with `npm run dev`
* A `Get Hint` button will show up under the 2048 grid on UI

To use this on hosted version, will need to secure API key
* either use oauth to use users own key (more work)
* use server side chat implementation with hosted solution (more work + cost of queries)

Given the above, I have assumed I can defer this for now :D

### tests

There are 2 flavors of tests:
* `npm run test` runs vitest. these are mainly logic tests (unit)
* `npx playwright test` runs playwright. these comprise e2e smoke test + functional component tests

# react-droste

[![NPM](https://img.shields.io/npm/v/react-droste.svg)](https://www.npmjs.com/package/react-droste) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Ever want to put a live preview in a web page, of that page, or a piece of it?

This will let you do that, sorta.

Sometimes called the [droste effect](https://en.wikipedia.org/wiki/Droste_effect) or [mise en abyme](https://en.wikipedia.org/wiki/Mise_en_abyme).

Uses [html2canvas](http://html2canvas.hertzen.com/), which you probably want to read about [here](http://html2canvas.hertzen.com/documentation).

## Install

```bash
npm install --save react-droste
# or
yarn add react-droste
```

## Usage

```jsx
import React, { Component } from 'react'

import { Droste } from 'react-droste'
//import 'react-droste/dist/index.css'

class Droste extends Component {
  render() {
    // a good starting place config
    let config = { useCORS: true, scale: 0.5 }
    return <MyComponent width={100} height={150} config={config} />
  }
}
```

### Props

- `width`: width of the preview canvas component **Required**
- `height`: height of the preview canvas component **Required**
- `ttl`: ms before refresh, defaults to 500ms
- `config`: configuration object that's passed to [`html2canvas`](http://html2canvas.hertzen.com/configuration). To scale down the image, for instance try passing `{scale: 0.5 }`.
- `element`: the element to take a preview _of_. defaults to `document.body`

## Notes

`html2canvas` doesn't support all of HTML/CSS, so your page may not look perfect. Additionally, things like the CSS `:hover` pseudo-class won't work. [Here's a page of what is and isn't supported.](http://html2canvas.hertzen.com/features)

To get images to work, you either need to serve them from the same origin, or have cors set on them on the images request headers (on the server) and set `useCORS` to `true` in the `config` object that's passed to `html2canvas`.

This is extremely inefficient and should not be used for anything serious. Currently using a combination of `setInterval` and [raf-schd](https://github.com/alexreardon/raf-schd).

Here are some [relevant discussions](https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe/48412686#48412686) of `requestAnimationFrame` and throttling.

A better way to do it would be to use [`getDisplayMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia) and the browser [Screen Capture API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture), but that would require the user to not only give permission, but they would need to select the window to be captured.

> Made with create-react-library

## License

MIT © [Zach Schwartz](https://zachschwartz.com/)

# fretty.app

An interactive fretboard exploration tool for all stringed instruments.

Online version: [fretty.app](https://fretty.app)

If you like this project, consider donating (to cover domain costs) or submit a pull request!

<img width="100%" src="https://github.com/tfeldmann/fretty.app/raw/master/other/screenshot.png" alt="fretty.app screenshot">

## The Jamtrackers' Fork
I've made the following changes:
1. Removed the header, footer, select buttons, possibility to have more than 1 fretboard.
2. All settings can now be plucked from the query params of the URL, which allows for "deep linking" to a specific configuration.

I've made these changes in order to allow for a clean and simplistic use of fretty.app's interactive fretboard within other apps via an iframe (which is what I've done in my app, Jamtrackers).

Any app or website can now show scales via fretty.apps interactive fretboard by setting up an iframe. Specific configurations are passed via the iframes src, as such:
`src="http://fretty.jamtrackers.com/?scaleTonic=c&scaleType=minor"`

### Project setup
```
npm install
```

#### Run local development server
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

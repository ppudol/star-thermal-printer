# Star Thermal Printer

Fork of Klemenn1337/node-thermal-printer with more features for Star thermal printers.
For added features see [Added Features Section](#added-features)

## Installation

```bash
npm install star-thermal-printer
```

### Linux specific

Linux requires build-essentials

```bash
sudo apt-get install build-essential
```

### Browser specifics

When using inside a browser, the network interface will not work as browsers do not allow opening TCP sockets.  
You still need to instruct the compiler to ignore node dependencies. For webpack, it can be done like this:

```bash
new webpack.IgnorePlugin({
  resourceRegExp: /^fs$|^net$/,
}),
```

## Features

Refer to [Original Readme](https://github.com/Klemen1337/node-thermal-printer/blob/master/README.md)

## Added Features 

#### Set text size for star printers 

```js
printer.setTextSize(5,5);         // Set text height (0-5) and width (0-5)
```


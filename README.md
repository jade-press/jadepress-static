# jadepress-static

[![Build Status](https://travis-ci.org/jade-press/jadepress-static.svg?branch=master)](https://travis-ci.org/jade-press/jadepress-static)

jade-press plugin which create static content of post and category.

## use
```javascript
//in jade-press config.js
exports.setting = {
    //...
    plugins: {
        'jadepress-static': 'latest'
    }
    /*//optional setting
    pluginStaticPath: 'path/to/store/static/html' 
    //default is process.cwd() + '_static'
    */
    //...
}
```

then install

```bash
gulp install

# or just npm install jadepress-static
```


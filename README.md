# swagger-node-runner-sanitizer
This module is a fitting for swagger-node-runner

See the example folder in how to implement this

# What it does ?
This is a middleware that sanitizes your request to prevent XSS (using the [sanitizer](https://www.npmjs.com/package/sanitizer) plugin) and NoSQL injection by filtering  keys in objects that begin with a $ sign or contain a . and replacing them with the html codes.

'use strict';

const sanitizer = require('swagger-node-runner-sanitizer');

const create = () => {

  return (context, cb) => {
    context.request = sanitizer.sanitize(context.request);
    cb();
  };
};

module.exports = create;

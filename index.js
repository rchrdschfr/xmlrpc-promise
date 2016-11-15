var xmlrpc  = require('xmlrpc');
var Promise = require('bluebird');

function promisify(methodName) {
  var method = xmlrpc[methodName];

  return function() {
    var client = method.apply(xmlrpc, arguments);
    client.methodCall = Promise.promisify(client.methodCall, client);
    return client;
  }
}

module.exports = {
  createClient: promisify('createClient'),
  createSecureClient: promisify('createSecureClient'),
  createServer: xmlrpc.createServer.bind(xmlrpc),
  createSecureServer: xmlrpc.createSecureServer.bind(xmlrpc)
};

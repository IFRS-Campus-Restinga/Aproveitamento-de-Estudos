const PROXY_CONFIG = [
  {
    context: ['/api'],
    target:  'http://localhost:8080/',
    secure:  false,
    loLevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;

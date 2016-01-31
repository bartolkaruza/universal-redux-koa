import koa from 'koa';
import compress from 'koa-compress';
import favicon from 'koa-favicon';
import serve from 'koa-static';
import path from 'path';

/* Minimum config for koa example:
 export default {
  server: {
    rendererWebFramework: 'koa'
  }
 }
 */
import userConfig from './../config/universal-redux.config.js';

import { configure, renderer } from 'universal-redux';

const config = configure(userConfig);
const app = koa();

app.use(compress());

if (config.server.favicon) {
  app.use(favicon(path.resolve(config.server.favicon)));
}

const maxAge = config.server.maxAge || 0;
app.use(serve(path.resolve(config.server.staticPath), {maxage: maxAge}));

app.use(renderer(config));

app.listen(config.server.port);
console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.server.host, config.server.port);

import Koa from 'koa';
import serve from 'koa-static';
import path from 'path';

import { config } from'./config';
import { router } from './router';
import { Consts } from './utils';

const app = new Koa();

const callbackRun = () => 
  console.log(Consts.SERVER.RUN(config.server.host, config.server.port));

app.use(router.routes())
  .use(serve('../build'));

app.on('error', (err, ctx) => {
  console.error(Consts.SERVER.ERROR(err, ctx));
});

app.listen(config.server.port, config.server.host, callbackRun);
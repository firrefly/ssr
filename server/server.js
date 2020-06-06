// Modules
import Koa from 'koa';
import serve from 'koa-static';
import proxy from 'koa-proxy';
import path from 'path';
// Utils
import { config } from'./config';
import { router } from './router';
import { Consts } from './utils';

const app = new Koa();

const callbackRun = () => 
  console.log(Consts.SERVER.RUN(config.server.host, config.server.port));

app.use(router.routes());

if (Consts.ENV.IS_DEVELOPMENT) {
  app.use(proxy({
    host: Consts.PATH.TEMPLATE_DEV,
  }));

} else {
  app.use(serve('../build'));
}

app.on('error', (err, ctx) => {
  console.error(Consts.SERVER.ERROR(err, ctx));
});

app.listen(config.server.port, config.server.host, callbackRun);

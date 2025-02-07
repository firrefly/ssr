// Modules
import Router from '@koa/router';
import fs from 'fs';
import path from 'path';
// Lib
import { getClientApp } from '../lib';
// Utils
import { routes } from './routes';

const router = new Router();

router.get(routes.home.path, async(ctx, next) => {
  const appResponse = await getClientApp();

  ctx.set({
    'Content-Type': 'text/html; charset=utf-8',
  });
  ctx.response.status = 200;
  ctx.body = appResponse;
});

export { router };

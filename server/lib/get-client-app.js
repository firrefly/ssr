// Modules
import fs from 'fs';
import  rp from 'request-promise';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
// Utils
import { routes } from '../router/routes';
import { Consts } from '../utils';

const getTemplate = async() => {
  let data;
  if (Consts.ENV.IS_DEVELOPMENT) {
    data = await rp(Consts.PATH.TEMPLATE_DEV);
  } else {
    data = fs.readFileSync(Consts.PATH.TEMPLATE_PROD, 'utf-8');
  }

  return data;
};

export const getClientApp = async() => {
  const htmlContent = await getTemplate();
  const Component = routes.home.component;
  const reactDom = ReactDOMServer.renderToString(<Component />);
  let appResponse;

  if (htmlContent) {
    appResponse = htmlContent.replace(
      '<div id="root"></div>',
      `<div id="root">${reactDom}</div>`
    );
  }

  return appResponse;
};

// Modules
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
// Utils
import { routes } from '../router/routes';
import { Consts } from '../utils';

export const getClientApp = () => {
  const htmlContent = fs.readFileSync(Consts.PATH.TEMPLATE, 'utf-8');
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

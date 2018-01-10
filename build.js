import * as React from 'react';
import fs from 'fs-extra';
import opn from 'opn';
import { wrap } from './src/server/helpers';
import routes from './src/server/routes';
import App from './src/components/App';

Object.keys(routes).map(route => {
  const { props, children } = routes[route]();
  const html = wrap(<App {...props}>{children}</App>);
  const path = route === '/' ? '/index' : route;
  fs.outputFile(`build/${path}.html`, html);
  opn(`file:///${__dirname}/build/index.html`, { wait: false });
});

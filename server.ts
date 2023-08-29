import { join } from 'node:path';
import * as express from 'express';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';

import bootstrap from './src/main.server';

const server = express();
const distFolder = join(process.cwd(), 'dist/bun-universal/browser');

server.engine(
  'html',
  ngExpressEngine({
    bootstrap,
  })
);

server.set('view engine', 'html');
server.set('views', distFolder);

server.get('*.*', express.static(distFolder));

server.get('*', (req, res) => {
  res.render('index', {
    req,
    providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
  });
});

const port = process.env['PORT'] || 4000;

server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});

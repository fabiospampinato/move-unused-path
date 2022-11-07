
/* IMPORT */

import {describe} from 'fava';
import fs from 'node:fs';
import path from 'node:path';
import moveUnusedPath from '../dist/index.js';

/* MAIN */

describe ( 'moveUnusedPath', it => {

  it ( 'works', async t => {

    const filePathSource = path.join ( process.cwd (), 'foo.txt' );
    const filePathTarget = path.join ( process.cwd (), 'foo (2).txt' );

    fs.writeFileSync ( filePathSource, '' );

    const result = await moveUnusedPath ( filePathSource, { fileName: 'foo.txt' } );

    t.is ( result.filePath, filePathTarget );
    t.false ( fs.existsSync ( filePathSource ) );
    t.true ( fs.existsSync ( filePathTarget ) );

    fs.unlinkSync ( filePathTarget );

  });

});

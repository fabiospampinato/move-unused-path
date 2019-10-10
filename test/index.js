
/* IMPORT */

import {describe} from 'ava-spec';
import * as fs from 'fs';
import * as path from 'path';
import {default as moveUnusedPath} from '../dist';

/* MOVE UNUSED PATH */

describe ( 'moveUnusedPath', it => {

  it ( 'works', async t => {

    const filePathSource = path.join ( process.cwd (), 'foo.txt' ),
          filePathTarget = path.join ( process.cwd (), 'foo (2).txt' );

    fs.writeFileSync ( filePathSource );

    const result = await moveUnusedPath ( filePathSource, { fileName: 'foo.txt' } );

    t.is ( result.filePath, filePathTarget );
    t.false ( fs.existsSync ( filePathSource ) );
    t.true ( fs.existsSync ( filePathTarget ) );

    fs.unlinkSync ( filePathTarget );

  });

});

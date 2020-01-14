
/* IMPORT */

import * as fs from 'fs-extra';
import getUnusedPath from 'get-unused-path';
import {Options, Result} from 'get-unused-path/dist/types';
import tryloop from 'tryloop';

/* MOVE UNUSED PATH */

function moveUnusedPath ( filePath: string, options: Options ): Promise<Result> {

  return new Promise ( ( resolve, reject ) => {

    getUnusedPath ( options ).then ( result => {

      function move () {
        return new Promise ( resolve => {
          fs.move ( filePath, result.filePath, err => {
            if ( err ) return resolve ();
            resolve ( true );
          });
        });
      }

      function end ( success?: boolean ) {
        result.dispose ();
        if ( success === true ) return resolve ( result );
        reject ( new Error ( 'Couldn\'t move to unused path' ) );
      }

      const loop = tryloop.exponential ({
        timeout: 3000,
        tries: 20,
        factor: 2,
        minInterval: 1,
        maxInterval: 1000,
        fn: move
      });

      loop.start ().then ( end ).catch ( end );

    }).catch ( reject );

  });

}

/* EXPORT */

export default moveUnusedPath;


/* IMPORT */

import * as fs from 'fs-extra';
import getUnusedPath from 'get-unused-path';
import {Result} from 'get-unused-path/dist/types';
import tryloop from 'tryloop';
import {ExponentialOptions} from 'tryloop/dist/types';
import {Options} from './types';

/* MOVE UNUSED PATH */

function moveUnusedPath ( filePath: string, options: Options, tryloopOptions?: Partial<Omit<ExponentialOptions, 'fn'>> ): Promise<Result> {

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
        if ( options.autoDispose !== false ) result.dispose ();
        if ( success === true ) return resolve ( result );
        reject ( new Error ( 'Couldn\'t move to unused path' ) );
      }

      const exponentialOptions = Object.assign ({
        timeout: 3000,
        tries: 20,
        factor: 2,
        minInterval: 1,
        maxInterval: 1000,
        fn: move
      }, tryloopOptions );

      const loop = tryloop.exponential ( exponentialOptions );

      loop.start ().then ( end ).catch ( end );

    }).catch ( reject );

  });

}

moveUnusedPath.blacklist = getUnusedPath.blacklist;

/* EXPORT */

export default moveUnusedPath;

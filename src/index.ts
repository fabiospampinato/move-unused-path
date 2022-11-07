
/* IMPORT */

import getUnusedPath from 'get-unused-path';
import fs from 'node:fs';
import type {Options, Result} from './types';

/* MAIN */

const moveUnusedPath = async ( filePath: string, options: Options ): Promise<Result> => {

  const result = await getUnusedPath ( options );

  try {

    await fs.promises.rename ( filePath, result.filePath );

    return result;

  } finally {

    if ( options.autoDispose !== false ) {

      result.dispose ();

    }

  }

};

/* EXPORT */

export default moveUnusedPath;

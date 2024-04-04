
/* IMPORT */

import type {Options as BaseOptions, Result} from 'get-unused-path';

/* MAIN */

type Options = BaseOptions & {
  autoDispose?: boolean // Automatically dispose once the operation is completed, enabled by default
};

/* EXPORT */

export type {Options, Result};

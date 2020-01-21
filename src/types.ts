
/* IMPORT */

import {Options as BaseOptions} from 'get-unused-path/dist/types';

/* TYPES */

type Options = BaseOptions & {
  autoDispose?: boolean // Automatically dispose once the operation is completed, enabled by default
};

/* EXPORT */

export {Options};

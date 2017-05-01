// Utilities:
import * as dedent from 'dedent';

export function EnsureError (message) {
    this.message = dedent(message);
    Error.captureStackTrace(this, EnsureError);
}

EnsureError.prototype = Object.create(Error.prototype);
EnsureError.prototype.constructor = EnsureError;

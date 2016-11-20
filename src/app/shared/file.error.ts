
/**
 * Encapsulates a JSON error returned by a Spring Rest Controller.
 *
 * @export
 * @class FileUploadError
 */
export class FileUploadError {
    timestamp: number;
    error: string;
    message: string;
    path: string;
    status: number;
}

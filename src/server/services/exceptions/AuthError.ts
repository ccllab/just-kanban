/**
 * The error for authentication
 */
export default class AuthError extends Error {

    /**
     * constructor
     * @param message Error message
     */
    public constructor(message: string) {

        super(message);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, AuthError.prototype);
    }
}

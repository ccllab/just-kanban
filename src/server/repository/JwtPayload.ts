export class JwtPayload {

    /**
     * JwtPayload constructor
     * @param username The name of user
     * @param email The email of user
     */
    public constructor(
        public username: string,
        public email: string
    ) {
    }
}

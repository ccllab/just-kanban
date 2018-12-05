/**
 * Board members information
 */
export class BoardMembersInfoDto {

    /**
     * Board id
     */
    public _id: string;

    /**
     * Board name
     */
    public boardName: string;

    /**
     * Board admin list
     */
    public admins: Array<{
        username: string,
        userId: string
    }> = [];

    /**
     * Board member list
     */
    public members: Array<{
        username: string,
        userId: string
    }> = [];
}

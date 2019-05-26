/**
 * Board member updating dto
 */
export class BoardMemberUpdateDto {

    /**
     * The board name
     */
    public boardName: string;

    /**
     * list for admins insert remove.
     */
    public admins: {insert: string[], remove: string[]} = {insert: [], remove: []};

    /**
     * list for members insert remove.
     */
    public members: {insert: string[], remove: string[]} = {insert: [], remove: []};
}

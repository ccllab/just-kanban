/**
 * Interface for define column that storage created at date and updated at date.
 */
export interface ICreatedAtUpdateAt {

    /**
     * Created at date
     */
    createdAtFlag(): Date;

    createdAt: Date;

    /**
     * Updated at date
     */
    updatedAtFlag(): Date;

    updatedAt: Date;
}

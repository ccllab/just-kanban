/**
 * Isolation level enum
 */
export enum IsolationLevel {

    /**
     * Can read the data that didn't commit yet.
     */
    ReadUncommitted = 'READ UNCOMMITTED',

    /**
     * Can read the data only committed
     */
    ReadCommitted = 'READ COMMITTED',

    /**
     * Read same data, when use same query in every transaction.
     */
    RepeatableRead = 'REPEATABLE READ',

    /**
     * A serializable execution is defined to be an execution
     * of the operations of concurrently executing SQL-transactions
     * that produces the same effect as some serial execution of those
     * same SQL-transactions.
     */
    Serializable = 'SERIALIZABLE'
}

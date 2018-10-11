/**
 * 交易隔離等級列舉
 */
export enum IsolationLevel {

    /**
     * 代表 transaction 可以讀到別的 transaction 尚未 commit 的資料。
     */
    ReadUncommitted = 'READ UNCOMMITTED',

    /**
     * 代表 transaction 只能讀到別的 transaction 已經 commit 的資料。
     */
    ReadCommitted = 'READ COMMITTED',

    /**
     * 代表每次 transaction 要讀取特定欄位的資料時，只要 query 條件相同，讀取到的資料就會相同。
     */
    RepeatableRead = 'REPEATABLE READ',

    /**
     * 代表在多個 transaction 同時執行時，只要 transaction 的順序相同時，得到的結果一定相同。
     */
    Serializable = 'SERIALIZABLE'
}
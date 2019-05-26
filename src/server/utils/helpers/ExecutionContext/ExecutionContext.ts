import '../../extensions/extension'; // import extension method
import {IExecutionContext} from "./IExecutionContext";
import {injectable} from "inversify";

/**
 * Implement for IExecutionContext
 */
@injectable()
export class ExecutionContext implements IExecutionContext {

    /**
     * The date for application execution.
     * In application source code, call this if wanna get date now.
     * If something change, just change here.
     */
    public dateNow: Date = new Date().addHours(8); // UTC+08:00
}

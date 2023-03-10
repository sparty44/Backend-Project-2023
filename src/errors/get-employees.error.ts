import { ErrorCode } from "../database/error/error-code.enum";

export class GetEmployeesError extends Error {
    /**
     * Default error message.
     */
    public static ERROR_MESSAGE: string = "Unable to get employees at this time.";

    /**
     * Constructor.
     * @Param message
     * @Param name
     * @Param code
     */
    constructor(
        message: string = GetEmployeesError.ERROR_MESSAGE,
        name: string = "GetEmployeesError",
        public code: number = ErrorCode.UNKNOWN_ERROR_CODE,
    ) {
        super(message);
        this.name = name;
        this.message = message;
    }
}
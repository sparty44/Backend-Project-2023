import { injectable, inject } from "inversify";
import { api, apiController, GET, apiOperation, apiResponse, principal, queryParam } from "ts-lambda-api";
import * as httpStatus from "http-status";
// This next import would come from where ever we store core info. 
import { ApiResponseDto, AbstractController, LogFactory, Logger, SwaggerUtil, AuthPrincipal, Page } from "where-ever-we-store-this";
import { Employee } from "../database/entity/employee.entity";
import { ErrorCode } from "../database/error/error-code.enum";
import { EmployeeResponseDto } from "../model/dto/response/employee.response-dto";
import { GetEmployeesError } from "../errors/get-employees.error";
import { EmployeeControllerInterface } from "./employee.controller.interface";


@apiController("employees")
@injectable()
@api("Employees", "Endpoints for interacting with Employees.")
export class EmployeeController extends AbstractController implements EmployeeControllerInterface {
    /**
     * Logger for internal use.
     */
    private static logger: Logger = LogFactory.getLogger(EmployeeController.name);

    /**
     * Constructor.
     */
    public constructor(
        @inject(TYPES.EmployeeService) private readonly employeeService: EmployeeServiceInterface,
        @inject(TYPES.EmployeeMapper) private readonly employeeMapper: EmployeeMapperInterface,
    ) {
        super();
    }

    /**
     * API endpoint to retrieve all employee's based on a query, sort, or pagination event.
     * I chose to include pagination because if you're working with large enough datasets in the UI to warrant searching or sorting,
     *      then you're almost certainly going to require pagination. 
     */
    @GET("/")
    @apiOperation({ name: "Get all Employees", description: "Get all employees based on a query, sort, or pagination."})
    @apiResponse( httpStatus.OK, { class: EmployeeResponseDto, description: "Retrieved Employees." })
    @apiResponse( httpStatus.UNAUTHORIZED, { description: SwaggerUtil.UNAUTHORIZED_DESCRIPTION })
    @apiResponse( httpStatus.INTERNAL_SERVER_ERROR)
    public async getEmployees(
        @principal authPrincipal: AuthPrincipal,
        @queryParam("count") count: number,
        @queryParam("index") index: number,
        @queryParam("query") query: string,
        @queryParam("sortColumn") sortColumn: string,
        @queryParam("sortDirection") sortDir: string,
    ): Promise<ApiResponseDto<EmployeeResponseDto[]>> {
        try {
            EmployeeController.logger.debug('getEmployees()');
            const { data, metadata }: Page<Employee[]> = await this.employeeService.getEmployees(
                authPrincipal,
                count,
                index,
                query,
                sortDir,
                sortColumn,
            );
            const dto: EmployeeResponseDto[] = this.employeeMapper.toEmployeeResponseDtos(data);
            return this.ok<EmployeeResponseDto[]>(dto, "Successfully retrieved employee(s).", metadata);
        } catch (err) {
            EmployeeController.logger.console.error('getEmployeesFault( ${(err as Error).message} )');
            return this.fail(new GetEmployeesError((err as Error).message, "GetEmployeesError", ErrorCode.CANNOT_GET_EMPLOYEES));
        }
    }
}
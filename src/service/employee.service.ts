import { injectable, inject } from "inversify";
// This next import would come from where ever we store core info. 
import { LogFactory, Logger, AuthPrincipal, Page } from "where-ever-we-store-this";
import { Employee } from "../database/entity/employee.entity";
import { TYPES } from "../core/infrastructure/container/container.types";
import { EmployeeRepositoryInterface } from "./employee.repository.interface";

@injectable()
export class EmployeeService implements EmployeeServiceInterface {
    /**
     * Logger for internal use.
     */
    private static logger: Logger = LogFactory.getLogger(EmployeeService.name);

    /**
     * Constructor.
     * @param dbcm
     * @param databaseName
     */
    public constructor(@inject(TYPES.EmployeeRepository) private readonly employeeRepository: EmployeeRepositoryInterface) {}

    /**
     * Return employees associated with an organization based on a query, sort, or pagination event.
     * @param authPrincipal
     * @param count
     * @param index
     * @param query
     * @param direction 
     * @param property
     */
    public async getEmployees(
        authPrincipal: AuthPrincipal,
        count?: number,
        index?: number,
        query?: string,
        direction?: string,
        property?: string,
    ): Promise<Page<Employee[]>> {
        EmployeeService.logger.debug('getEmployees()');

        // If count is null, grab a default number of employees.
        let validCount: number;
        if (count) {
            validCount = count;
        } else {
            validCount = 50;
        }

        return await this.employeeRepository.getEmployees(validCount, index, query, direction, property, authPrincipal);
    }
}
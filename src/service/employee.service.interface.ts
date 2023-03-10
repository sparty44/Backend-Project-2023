// This next import would come from where ever we store core info. 
import { AuthPrincipal, Page } from "where-ever-we-store-this";
import { Employee } from "../database/entity/employee.entity";

export interface EmployeeServiceInterface {
    /////////////////////////////////////////////////////////
    // Read
    /////////////////////////////////////////////////////////
    getEmployees(
        authPrincipal: AuthPrincipal,
        count?: number,
        index?: number,
        query?: string,
        direction?: string,
        property?: string,
    ): Promise<Page<Employee[]>>;
}
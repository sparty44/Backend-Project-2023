// This next import would come from where ever we store core info. 
import { AuthPrincipal, Page, IWrite, IRead } from "where-ever-we-store-this";
import { Employee } from "../database/entity/employee.entity";

export interface EmployeeRepositoryInterface extends IWrite<Employee>, IRead<Employee> {
    getEmployees(
        count: number,
        index: number,
        query: string,
        direction: string,
        property: string,
        authPrincipal?: AuthPrincipal,
    ): Promise<Page<Employee[]>>;
}
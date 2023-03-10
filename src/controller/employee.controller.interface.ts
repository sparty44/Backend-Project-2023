// This next import would come from where ever we store core info. 
import { ApiResponseDto, AuthPrincipal } from "where-ever-we-store-this";
import { EmployeeResponseDto } from "../model/dto/response/employee.response-dto";

export interface EmployeeControllerInterface {
    /////////////////////////////////////////////////////////
    // Read
    /////////////////////////////////////////////////////////

    getEmployees(authPrincipal: AuthPrincipal, count: number, index: number, query: string, sortColumn: string, sortDir: string): Promise<ApiResponseDto<EmployeeResponseDto[]>>;
}

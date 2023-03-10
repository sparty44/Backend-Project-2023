import { Employee } from "../database/entity/employee.entity";
// This next import would come from where ever we store core info. 
import { Mapper } from "where-ever-we-store-this";
import { EmployeeResponseDto } from "../model/dto/response/employee.response-dto";

export interface EmployeeMapperInterface extends Mapper<Employee> {
    toEmployeeResponseDtos(employee: Employee[]): EmployeeResponseDto[];
}
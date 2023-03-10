import { Employee } from "../database/entity/employee.entity";
import { EmployeeResponseDto } from "../model/dto/response/employee.response-dto";
import { EmployeeMapperInterface } from "./employee.mapper.interface";
import { injectable } from "inversify";

@injectable()
export class EmployeeMapper implements EmployeeMapperInterface {
    constructor() {}

    /**
     * Creates EmployeeResponseDtos from Employees.
     * @param employee
     */
    public toEmployeeResponseDtos(employee: Employee[]): EmployeeResponseDto[] {
        return employee.map(
            (employeeEntity: Employee): EmployeeResponseDto => ({
                id: employeeEntity.id,
                firstName: employeeEntity.firstName,
                lastName: employeeEntity.lastName,
                startDate: employeeEntity.startDate,
                birthDate: employeeEntity.birthDate,
                salary: employeeEntity.salary,
                title: employeeEntity.title,
                department: employeeEntity.department,
            }),
        );
    }
}
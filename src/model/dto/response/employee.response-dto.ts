// This next import would come from where ever we store core info. 
import { AbstractDto, ApiResponseDto, SwaggerUtil } from "where-ever-we-store-this";
import { Employee } from "../../../database/entity/employee.entity";

export class EmployeeResponseDto extends AbstractDto {
    public id: string;
    public firstName: string;
    public lastName: string;
    public startDate: Date;
    public birthDate: Date;
    public salary: number;
    public title: string;
    public department: string;

    public static example(): ApiResponseDto<Employee[]> {
        const uuid = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
        const data = EmployeeResponseDto[] = [
            {
                id: uuid,
                firstName: "firstName",
                lastName: "lastName",
                startDate: new Date(),
                birthDate: new Date(),
                salary: 100000,
                title: "Software Engineer",
                department: "Information Technology",
            }
        ];
        return SwaggerUtil.createSuccessDto(data);
    }
}

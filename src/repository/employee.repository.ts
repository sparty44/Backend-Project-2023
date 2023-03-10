import { injectable, inject } from "inversify";
// This next import would come from where ever we store core info. 
import { AbstractRepository, LogFactory, Logger, AuthPrincipal, Page, PageData, DbcmInterface } from "where-ever-we-store-this";
import { Employee } from "../database/entity/employee.entity";
import { TYPES } from "../core/infrastructure/container/container.types";
import { EmployeeRepositoryInterface } from "./employee.repository.interface";

@injectable()
export class EmployeeRepository extends AbstractRepository<Employee> implements EmployeeRepositoryInterface {
    /**
     * Logger for internal use.
     */
    private static logger: Logger = LogFactory.getLogger(EmployeeRepository.name);

    /**
     * Constructor.
     * @param dbcm
     * @param databaseName
     */
    public constructor(@inject(TYPES.DatabaseConnectionManager) dbcm: DbcmInterface, @inject(TYPES.DatabaseName) databaseName: string) {
        super(dbcm, databaseName);
    }

    /**
     * Retrieve employee entities based on a query, sort, or pagination event.
     * @param query
     * @param direction 
     * @param property
     * @param authPrincipal
     */
    public async getEmployees(
        count: number,
        index: number,
        query: string,
        direction: string,
        property: string,
        authPrincipal?: AuthPrincipal,
    ): Promise<Page<Employee[]>> {
        EmployeeRepository.logger.debug('getAll()');
        //This next line is essentially a placeholder. At my last employ, this is the route we'd take to access the repo via
        //      AbstractController. This likely changes from place to place obviously.
        const repository = await this.getDynamicRepository(Employee, authPrincipal, true);
        const options: {take?: number; skip?: number } = count ? {take: count, skip: count * index } : {};

        // The base part of the query.
        let queryBuilder = repository
            .createQueryBuilder("employees")

        // If a query is being done by the user, that's done here.
        if (query) {
            queryBuilder = queryBuilder
                .andWhere(`"employees"."first_name" ILIKE :query`, { query: `%${query}%` })
                .orWhere(`"employees"."last_name" ILIKE :query`, { query: `%${query}%` })
                .orWhere("to_char(employees.startDate, 'FMMM/FMDD/YYYY') = :query", { query })
                .orWhere("to_char(employees.birthDate, 'FMMM/FMDD/YYYY') = :query", { query })
                .orWhere(`"employees"."salary" ILIKE :query`, { query: `%${query}%` })
                .orWhere(`"employees"."title" ILIKE :query`, { query: `%${query}%` })
                .orWhere(`"employees"."department" ILIKE :query`, { query: `%${query}%` });
        }

        // If a sort is being done by the user, that's done here.
        if (direction && property) {
            if (direction === "desc"){
                queryBuilder = queryBuilder.addOrderBy(`"employees".${property}`, "DESC");
            }
            else {
                queryBuilder = queryBuilder.addOrderBy(`"employees".${property}`, "ASC");
            }
        }


        // We need the count of total results before pagination.
        const total: number = await queryBuilder.getCount();

        const results: Employee[] = await queryBuilder
            .offset(options.skip)
            .limit(options.take)
            .getMany();

        const params: Partial<PageData> = {
            sort: { property, direction: direction },
            query,
        };

        return {
            metadata: {
                total,
                ...(count
                    ? {
                        current: {
                            count: "" + count,
                            index: "" + index,
                            ...params,
                        },
                        ...(index
                            ? {
                                previous: {
                                    index: "" + (index - 1),
                                    count: "" + options.take,
                                    ...params,
                                },
                            }
                            : {}),
                        ...(count * (index - 1) < total
                            ? {
                                next: {
                                    index: "" + (index + 1),
                                    count: "" + options.take,
                                    ...params,
                                }
                            }
                            : {}),
                    }
                    : {}),
            },
            data: results,
        };
    }
}
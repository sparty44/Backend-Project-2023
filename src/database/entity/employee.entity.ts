import { Column, Entity, Index, PrimaryGeneratedColumn, CreateDateColumn } from "Typeorm";
import { isNotEmpty, isOptional } from "class-validator";

@Index("employees_pkey", ["id"], {unique: true})
@Entity("employees")
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    @isNotEmpty()
    public id?: string;

    @Column("varchar", {
        length: 50,
        nullable: false,
        name: "first_name",
    })
    @isNotEmpty()
    public firstName?: string;

    @Column("varchar", {
        length: 50,
        nullable: false,
        name: "last_name",
    })
    @isNotEmpty()
    public lastName?: string;

    @CreateDateColumn()
    public startDate?: Date;

    @CreateDateColumn()
    public birthDate?: Date;

    @Column("money", {
        name: "salary",
        default: () => "0",
    })
    @isNotEmpty()
    public salary?: number;

    @Column("varchar", {
        length: 100,
        nullable: false,
        name: "title",
    })
    @isNotEmpty()
    public title?: string;

    @Column("varchar", {
        length: 50,
        nullable: false,
        name: "department",
    })
    @isOptional()
    public department?: string;
}
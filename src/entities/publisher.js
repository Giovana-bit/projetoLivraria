import { EntitySchema } from "typeorm";

const publisher = new EntitySchema({
    name: "Publisher",
    tableName: "publisher",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        publisher_name: {type: "varchar", length: 100, nullable: false},
        cnpj: {type: "varchar", length: 45, nullable: false},
        email: {type: "varchar", length: 100, nullable: false},
        createAt: {type: "datetime", nullable: false, default: () =>
            "CURRENT_TIMESTAMP"},
        deleteAt: {type: "datetime", nullable: true}
    }
})

export default publisher

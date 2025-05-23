import { EntitySchema } from "typeorm";

const category = new EntitySchema({
    name: "Category",
    tableName: "category",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        name_category: {type: "varchar", length: 45, nullable: false},
        createAt: {type: "datetime", nullable: false, default: () =>
            "CURRENT_TIMESTAMP"},
        deleteAt: {type: "datetime", nullable: true}
    }
});

export default category

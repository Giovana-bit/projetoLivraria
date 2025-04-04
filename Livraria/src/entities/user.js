import { EntitySchema } from "typeorm";

const user = new EntitySchema({
    name: "User",
    tableName:"user",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        name: {type: "varchar", length: 50, nullable: false}
    }
});

export default user

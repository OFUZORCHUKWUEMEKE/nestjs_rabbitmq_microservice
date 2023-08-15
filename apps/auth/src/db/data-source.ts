import { DataSource, DataSourceOptions } from "typeorm";
import configuration from "../config/config";
import { UserEntity } from "../user.entity";

const config = configuration()

export const datasourceOptions: DataSourceOptions = {
    type: 'postgres',
    url: config.POSTGRES_URI,
    entities: [UserEntity],
    migrations: ['dist/apps/auth/db/migrations/*.js']
}

export const dataSource = new DataSource(datasourceOptions)
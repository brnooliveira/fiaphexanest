// import { ConfigService } from "@nestjs/config";
// import { DataSource } from "typeorm";
// import { DATA_SOURCE } from "../../../core/application/constants/tokens";
// import { join } from "path";

// export const databaseProviders = [{
//     provide: DATA_SOURCE,
//     useFactory: async (configService: ConfigService) => {
//         const dataSource = new DataSource({
//             type: 'postgres',
//             host: configService.get<string>('DB_HOST'),
//             port: configService.get<number>('DB_PORT'),
//             username: configService.get<string>('DB_USER'),
//             password: configService.get<string>('DB_PASSWORD'),
//             database: configService.get<string>('DB_NAME'),
//             entities: [
//                 __dirname + '/../../../core/domain/entities/*{.ts,.js}',''
//             ],
//             synchronize: true,
            
//         });

//         console.log({
//             type: 'postgres',
//             host: configService.get<string>('DB_HOST'),
//             port: configService.get<number>('DB_PORT'),
//             username: configService.get<string>('DB_USER'),
//             password: configService.get<string>('DB_PASSWORD'),
//             database: configService.get<string>('DB_NAME'),
//             entities: [
//                 join(__dirname, '\\..\\..\\..\\core\\domain\\entities\\*.js'),
//             ],
//             synchronize: true,
//         })
//         return dataSource.initialize();
//     },
//     inject: [ConfigService]
// }];
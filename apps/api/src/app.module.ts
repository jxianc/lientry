import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { AppResolver } from './app.resolver'
import { TreesModule } from './trees/trees.module'
import { LinksModule } from './links/links.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }) => ({ req, res }), // attach request and response to graphql context
    }),
    UsersModule,
    AuthModule,
    TreesModule,
    LinksModule,
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CategoriesService } from "./categories.service";
import Category from "./category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [],
  providers: [CategoriesService]
})
export class CategoriesModule {}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Category from './category.entity';
import UpdateCategorytDto from './dto/updateCategory.dto';

const NOT_FOUND_MSG = 'Category not found';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

  async getAllCategories() {
    return await this.categoryRepository.find({ relations: ['posts']});
  }

  async getCategoryById(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['posts']
    });

    if (category) return category;

    throw new HttpException(NOT_FOUND_MSG, HttpStatus.NOT_FOUND);
  }

  async updateCategory(id: string, category: UpdateCategorytDto) {
    await this.categoryRepository.update(id, category);
    const updatedCategory = await this.categoryRepository.findOne({
      where: { id },
      relations: ['posts']
    });

    if (updatedCategory) return updatedCategory;

    throw new HttpException(NOT_FOUND_MSG, HttpStatus.NOT_FOUND);
  }
}

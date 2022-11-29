import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/products.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productModel.create(createProductDto);
  }

  async findAll() {
    return this.productModel.find();
  }

  findOne(id: number) {
    return this.productModel.findOne({ _id: id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productModel.updateOne({ _id: id }, updateProductDto);
  }

  remove(id: number) {
    return this.productModel.remove({ _id: id });
  }
}

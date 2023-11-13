import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { IProduct } from 'src/interface/product.interface';
import { Model } from 'mongoose';
import { UpdateProductDto } from '../dto/update-quest.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<IProduct>) {}

  async createProduct(createProductDto: CreateProductDto): Promise<IProduct> {
    const newProduct = await new this.productModel(createProductDto);
    return newProduct.save();
  }

  async updateProduct(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IProduct> {
    const existingProduct = await this.productModel.findByIdAndUpdate(
      productId,
      updateProductDto,
      { new: true },
    );
    if (!existingProduct) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    return existingProduct;
  }

  async getAllProducts(): Promise<IProduct[]> {
    const productData = await this.productModel.find();
    if (!productData || productData.length == 0) {
      throw new NotFoundException('Products data not found!');
    }
    return productData;
  }

  async getAllCategories(): Promise<Array<string>> {
    const quests = await this.productModel.find();
    const answer = [];
    quests.forEach((quest) => {
      if (answer.includes(quest.category)) {
        return;
      } else {
        answer.push(quest.category);
      }
    });

    if (!quests || quests.length == 0) {
      throw new NotFoundException('products data not found!');
    }
    return answer;
  }

  async getProduct(productId: string): Promise<IProduct> {
    const existingProduct = await this.productModel.findById(productId).exec();
    if (!existingProduct) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    return existingProduct;
  }

  async getProductsByCategory(category: string): Promise<Array<IProduct>> {
    const existingQuest = await this.productModel
      .find({ category: category })
      .exec();
    if (!existingQuest) {
      throw new NotFoundException(`Product #${category} not found`);
    }
    return existingQuest;
  }

  async deleteProduct(productId: string): Promise<IProduct> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    return deletedProduct;
  }
}

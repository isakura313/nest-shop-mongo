import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';

import { UpdateProductDto } from '../dto/update-quest.dto';
import { ProductService } from './product.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createProduct(
    @Res() response,
    @Body() createProductDto: CreateProductDto,
  ) {
    try {
      const newProduct = await this.productService.createProduct(
        createProductDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Product has been created successfully',
        newProduct,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Product not created!',
        error: 'Bad Request',
      });
    }
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async updateProduct(
    @Res() response,
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const existingProduct = await this.productService.updateProduct(
        productId,
        updateProductDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Product has been successfully updated',
        existingProduct,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getProducts(@Res() response) {
    try {
      const productData = await this.productService.getAllProducts();
      return response.status(HttpStatus.OK).json({
        message: 'All product data found successfully',
        productData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getProduct(@Res() response, @Param('id') productId: string) {
    try {
      const existingProduct = await this.productService.getProduct(productId);
      return response.status(HttpStatus.OK).json({
        message: 'Product found successfully',
        existingProduct,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/api/filters')
  async getQuestByDivision(@Res() response, @Query('category') category) {
    try {
      const existingQuest = await this.productService.getProductsByCategory(
        category,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Product found successfully',
        existingQuest,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/api/categories')
  async getCategory(@Res() response) {
    try {
      const existingQuest = await this.productService.getAllCategories();
      return response.status(HttpStatus.OK).json({
        message: 'Categories found successfully',
        existingQuest,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteProduct(@Res() response, @Param('id') productId: string) {
    try {
      const deletedProduct = await this.productService.deleteProduct(productId);
      return response.status(HttpStatus.OK).json({
        message: 'Product deleted successfully',
        deletedProduct,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}

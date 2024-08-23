import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Integration Test update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },            
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    
    it('should update a product', async () => {
        const productRepository = new ProductRepository();
    
        const productFactory = ProductFactory.create(
          'a',
          'Product 1',
          10,
        );
    
        const product = new Product(
          productFactory.id,
          productFactory.name,
          productFactory.price,
        );
    
        await productRepository.create(product);
    
        const input = {
          id: product.id,
          name: 'Product 2',
          price: 20,
        };
    
        const usecase = new UpdateProductUseCase(productRepository);
        const output = await usecase.execute(input);
    
        expect(output).toEqual(input);
      });  
});
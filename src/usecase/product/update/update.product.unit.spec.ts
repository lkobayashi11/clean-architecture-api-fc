import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const productId = "1";
const createProduct = () => {
    return new Product(productId, "Produto A", 100);
}

const input = {
    id: productId,
    name: "Produto alterado",
    price: 200,
}

const Repository  = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test update product use case", () => {
    it("should update a product", async () => {
        const productRepository = Repository ();
        productRepository.find = jest.fn().mockReturnValue(Promise.resolve(createProduct()))
        const usecase = new UpdateProductUseCase(productRepository);

        const productUpdated = await usecase.execute(input);
        expect(productUpdated).toEqual(input);
    });

    it("should throw an error when product not found", async () => {
        const productRepository = Repository ();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const usecase = new UpdateProductUseCase(productRepository);

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = Repository ();
        productRepository.find = jest.fn().mockReturnValue(Promise.resolve(createProduct()))
        const usecase = new UpdateProductUseCase(productRepository);
        input.name = "";
        input.price = 100;
        
        await expect(usecase.execute(input)).rejects.toThrow("Name is required");        
    });
   
});
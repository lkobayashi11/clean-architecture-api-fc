import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const productA = ProductFactory.create("a", "Produto A", 100);
const productB = ProductFactory.create("b", "Produto B", 200);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([productA, productB])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test for listing Product use case", () => {
    it("should return a list ofl products", async () => {
        const productRepository = MockRepository();
        const usecase = new ListProductUseCase(productRepository);

        const products = await usecase.execute({});
        expect(products.products.length).toEqual(2);
        expect(products.products[0].name).toBe(productA.name)
        expect(products.products[0].price).toBe(productA.price)

        expect(products.products[1].name).toBe(productB.name)
        expect(products.products[1].price).toBe(productB.price)
    });
});
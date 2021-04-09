import { defineFeature, loadFeature } from "jest-cucumber";
import { mock } from "jest-mock-extended";
import { Basket, StatementPrinter } from "../../main/basket";

const feature = loadFeature("./src/specs/features/basket.feature");

defineFeature(feature, (test) => {
  let basket: Basket;
  let statementPrinter: StatementPrinter;
  beforeEach(() => {
    statementPrinter = mock<StatementPrinter>();
    basket = new Basket(statementPrinter);
  });

  test("Client adds items to shopping basket", ({ given, and, when, then }) => {
    given(
      /^Client adds (\d+) "(.*)"$/,
      (quantity: number, itemName: string) => {
        basket.addItem(quantity, itemName);
      }
    );
    and(/^Client adds (\d+) "(.*)"$/, (quantity: number, itemName: string) => {
      basket.addItem(quantity, itemName);
    });
    when("they check their shopping basket", () => {
      basket.print();
    });
    then("they should see", (dataTable) => {
      expect(statementPrinter.print).toBeCalledWith(dataTable);
    });
  });
});

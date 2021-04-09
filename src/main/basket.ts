interface CatalogItem {
  name: string;
  unitPrice: number;
}

const catalog: Map<String, CatalogItem> = new Map([
  ["The Hobbit", { name: "The Hobbit", unitPrice: 5 }],
  ["Breaking Bad", { name: "Breaking Bad", unitPrice: 7 }],
]);

interface BasketItem {
  catalogItem: CatalogItem;
  quantity: number;
}

export class Basket {
  private printer: StatementPrinter;
  private lineItems: BasketItem[] = [];

  constructor(printer: StatementPrinter) {
    this.printer = printer;
  }

  addItem(quantity: number, itemName: string) {
    const catalogItem = catalog.get(itemName);
    if (!catalogItem) {
      throw new Error("Invalid item");
    }

    this.lineItems.push({ catalogItem, quantity });
  }

  print() {
    const items = this.lineItems
      .map((item) => {
        const lineItemPrice = item.quantity * item.catalogItem.unitPrice;
        const quantityAndName = `${item.quantity} x ${item.catalogItem.name}`;
        const quantityAndPrice = `${
          item.quantity
        } x ${item.catalogItem.unitPrice.toFixed(2)}`;

        return `${quantityAndName} // ${quantityAndPrice} = £${lineItemPrice.toFixed(
          2
        )}`;
      })
      .join("\n");

    const total = this.lineItems.reduce((total, item) => {
      const lineItemPrice = item.quantity * item.catalogItem.unitPrice;
      return total + lineItemPrice;
    }, 0);

    this.printer.print(
      ["Creation Date: 14/01/2012", items, `Total: £${total.toFixed(2)}`].join(
        "\n"
      )
    );
  }
}

export interface StatementPrinter {
  print: (data: string) => void;
}

import React, { useEffect, useMemo, useState } from "react";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import { getCartByCode, ShoppingCart } from "../../api/apiCalls";

const PayPalCustomButton: React.FC = () => {
  const [cart, setCart] = useState<ShoppingCart | null>(jsonCart);

  // get cart
  useEffect(() => {
    getCartByCode("a4858a597b2b41b09cf8f0dd83148dc2")
      .then((response) => {
        if (response.data) {
          console.log("CARRINHO", JSON.stringify(response.data));
          // console.log("carrinho do telegram", response.data);
          setCart(response.data);
        }
      })
      .catch((error) => {
        console.log("erro carrinho", error);
        // alert("Erro ao buscar carrinho");
      });
  }, []);

  const purchaseUnits = useMemo(() => {
    if (!cart) {
      return [];
    }

    let totalValue = 0;

    const items = cart.shoppingCartItems.map((item) => {
      totalValue += item.productPrice * item.quantity;

      return {
        name: item.name,
        category: "PHYSICAL_GOODS" as any,
        quantity: item.quantity.toString(),
        unit_amount: {
          value: item.productPrice.toString(),
          currency_code: "BRL",
        },
        sku: item.productCode,
      };
    });

    return [
      {
        amount: {
          value: totalValue.toFixed(2).toString(),
          currency_code: "BRL",
          breakdown: {
            item_total: {
              value: totalValue.toFixed(2).toString(),
              currency_code: "BRL",
            },
            discount: { value: "0", currency_code: "BRL" },
            handling: { value: "0", currency_code: "BRL" },
            insurance: { value: "0", currency_code: "BRL" },
            shipping: { value: "0", currency_code: "BRL" },
            shipping_discount: { value: "0", currency_code: "BRL" },
            tax_total: {
              value: "0",
              currency_code: "BRL",
            },
          },
        },
        items,
      },
    ];
  }, []);

  return (
    <PayPalScriptProvider options={paypalConfig}>
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: purchaseUnits,
          });
        }}
        onApprove={async (data, actions) => {
          console.log("data", data);
          console.log("actions", actions);

          // executar a compra
          actions.order
            .capture()
            .then((details) => {
              console.log("details", details);
              alert(
                "Transaction completed by " + details.payer.name.given_name,
              );
            })
            .catch((error) => {
              console.log("error", error);
            });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalCustomButton;

const data = [
  {
    amount: {
      value: "2",
      breakdown: {
        item_total: { value: "2" },
        discount: { value: "0" },
        handling: { value: "0" },
        insurance: { value: "0" },
        shipping: { value: "0" },
        shipping_discount: { value: "0" },
        tax_total: {
          value: "0",
        },
      },
    },

    items: [],
  },
];

const paypalConfig = {
  "client-id":
    "AWaYhHSMEdJrqPJzUAi2GsQ60FWIyyx5dx2Ay6sP2xMqmH4b8Yw7oxC_K7IEmERGSph9_L211--Kmquu",
  debug: true,
  currency: "BRL",
  intent: "capture",
  commit: true,
};

const jsonCart = {
  id: 174,
  language: null,
  message: null,
  code: "a4858a597b2b41b09cf8f0dd83148dc2",
  quantity: 3,
  total: "BRL0.90",
  subTotal: "BRL0.90",
  orderId: null,
  totals: [
    {
      id: 0,
      title: null,
      text: null,
      code: "order.total.subtotal",
      order: 0,
      module: null,
      value: 0.9,
    },
    {
      id: 0,
      title: null,
      text: null,
      code: "order.total.total",
      order: 0,
      module: null,
      value: 0.9,
    },
  ],
  shoppingCartItems: [
    {
      id: 186,
      language: null,
      name: "Caneta EsferogrÃ¡fica",
      price: "BRL0.35",
      image:
        "https://shopizer.multitrem.com/static/products/DEFAULT/04/SMALL/176022z.jpg",
      productPrice: 0.35,
      quantity: 2,
      productId: 55,
      productCode: "04",
      code: "a4858a597b2b41b09cf8f0dd83148dc2",
      productVirtual: false,
      subTotal: "BRL0.70",
      shoppingCartAttributes: null,
    },
    {
      id: 187,
      language: null,
      name: "Papel AlmaÃ§o A4",
      price: "BRL0.20",
      image:
        "https://shopizer.multitrem.com/static/products/DEFAULT/01/SMALL/468584z.jpg",
      productPrice: 0.2,
      quantity: 1,
      productId: 52,
      productCode: "01",
      code: "a4858a597b2b41b09cf8f0dd83148dc2",
      productVirtual: false,
      subTotal: "BRL0.20",
      shoppingCartAttributes: null,
    },
  ],
  unavailables: null,
};

const mountedCart = [
  {
    amount: {
      value: "0.90",
      currency_code: "BRL",
      breakdown: {
        item_total: { value: "0.90", currency_code: "BRL" },
        discount: { value: "0", currency_code: "BRL" },
        handling: { value: "0", currency_code: "BRL" },
        insurance: { value: "0", currency_code: "BRL" },
        shipping: { value: "0", currency_code: "BRL" },
        shipping_discount: { value: "0", currency_code: "BRL" },
        tax_total: { value: "0", currency_code: "BRL" },
      },
    },
    items: [
      {
        name: "Caneta Esferográfica",
        category: "PHYSICAL_GOODS" as any,
        quantity: "2",
        unit_amount: { value: "0.35", currency_code: "BRL" },
        sku: "04",
      },
      {
        name: "Papel A4",
        category: "PHYSICAL_GOODS" as any,
        quantity: "1",
        unit_amount: { value: "0.2", currency_code: "BRL" },
        sku: "01",
      },
    ],
  },
];

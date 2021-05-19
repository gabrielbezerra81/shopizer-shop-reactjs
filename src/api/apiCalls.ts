import api from "./config";

type CartItem = {
  id: number;
  name: string;
  price: string;
  image: string;
  productPrice: number;
  quantity: number;
  productId: number;
  productCode: string;
  subTotal: string;
};

export type ShoppingCart = {
  id: number;
  code: string;
  quantity: number;
  total: string;
  subTotal: string;
  shoppingCartItems: Array<CartItem>;
};

export const getCartByCode = (code: string) => {
  return api.get<ShoppingCart>("shop/cart/displayMiniCartByCode", {
    params: {
      shoppingCartCode: code,
    },
  });
};

import Cart from "../../models/cart.model";
import Product from "../../models/product.model";
import { validateUser } from "../../utils/validateUser";
import { AddToCartInput } from "./interface";

export const addToCart = async (_: any, input: AddToCartInput) => {
  const { userId, product } = input;

  await validateUser(userId);

  const productResponse = (await Product.findById(product.productId)) || null;
  if (!productResponse) {
    throw new Error("Invalid product id");
  }

  const variant = productResponse?.variations?.find(
    (variant) => variant?._id?.toString() === product?.variantId?.toString()
  );

  if (!variant) {
    throw new Error("Invalid variant ID");
  }

  let cart = await Cart.findById(userId);

  if (!cart) {
    cart = new Cart({
      userId: userId,
      products: [],
    });
  }

  const productInCart = cart.products.find(
    (item) => item.variantId.toString() === product.variantId.toString()
  );

  if (productInCart) {
    productInCart.quantity += product.quantity;
  } else {
    cart.products.push({
      productId: product.productId,
      quantity: product.quantity,
      variantId: product.variantId,
    });
  }

  await cart.save();

  return {
    status: 200,
    message: "Product added to cart successfully",
  };
};

export const getCart = async (_: any, input: { userId: string }) => {
  const { userId } = input;

  await validateUser(userId);

  let carts = await Cart.find({ userId }).populate("products.productId");

  if (!carts.length) {
    throw new Error("Cart not found");
  }

  let totalGrandTotal = 0;
  let allProducts: { product: any; variant: any }[] = [];

  await Promise.all(
    carts.map(async (cart) => {
      let grandTotal = 0;

      const productsWithDetails = await Promise.all(
        cart.products.map(async (product) => {
          const productDetails = await Product.findById(product.productId);

          if (productDetails && productDetails.price) {
            grandTotal += productDetails.price * product.quantity;
          }

          const variant = productDetails?.variations?.find(
            (variant) =>
              variant &&
              variant._id &&
              variant._id.toString() === product.variantId.toString()
          );

          return {
            product: productDetails,
            variant,
          };
        })
      );

      totalGrandTotal += grandTotal;
      allProducts = [...allProducts, ...productsWithDetails];
    })
  );

  return {
    grandTotal: totalGrandTotal,
    products: allProducts,
  };
};

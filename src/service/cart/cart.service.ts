import Cart from "../../models/cart.model";
import Product from "../../models/product.model";
import { validateUser } from "../../utils/validateUser";
import { AddToCartInput } from "./interface";

export const addToCart = async (_: any, input: AddToCartInput) => {
  const { userId, products, productId } = input;

  await validateUser(userId);

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      products: [],
    });
  }

  for (const product of products) {
    const productResponse = await Product.findById(productId);
    if (!productResponse) {
      throw new Error("Invalid product id");
    }

    const variant = productResponse.variations.find(
      (v) => v?._id?.toString() === product.variantId.toString()
    );

    if (!variant) {
      throw new Error("Invalid variant ID");
    }

    const productInCart = cart.products.find(
      (p) => String(p.productId) === String(productId)
    );

    if (productInCart) {
      const variantInProduct = productInCart?.variants.find(
        (v) => v.variantId.toString() === product.variantId.toString()
      );

      if (variantInProduct) {
        variantInProduct.quantity += product.quantity;
      } else {
        productInCart.variants.push({
          variantId: product.variantId,
          quantity: product.quantity,
        });
      }
    } else {
      cart.products.push({
        productId: productId,
        variants: [
          {
            variantId: product.variantId,
            quantity: product.quantity,
          },
        ],
      });
    }
  }

  await cart.save();

  return {
    status: 200,
    message: "Products added to cart successfully",
  };
};

export const getCart = async (_: any, input: { userId: string }) => {
  const { userId } = input;

  // Assuming validateUser is a function that validates the user
  await validateUser(userId);

  let cart = await Cart.findOne({ userId });

  console.log("cart", cart);

  if (!cart) {
    throw new Error("Cart not found");
  }

  let grandTotal = 0;
  const productsWithDetails = await Promise.all(cart.products.map(async (product) => {
    const productDetails = await Product.findById(product.productId);

    if (productDetails) {
      let productTotal = 0;
      let totalVariantCount = 0;

      const variantDetails = product.variants.map((variant) => {
        const variantDetail = productDetails?.variations.find(
          (variation) =>
            variation?._id?.toString() === variant.variantId.toString()
        );

        const variantPrice = variant.quantity * productDetails?.price;
        productTotal += variantPrice;
        totalVariantCount += variant.quantity;

        return {
          variantId: variant.variantId,
          quantity: variant.quantity,
          image: variantDetail?.image,
          color: variantDetail?.color,
        };
      });

      if (totalVariantCount > 10) {
        productTotal *= 0.95; // Apply 5% discount
      }

      grandTotal += productTotal;

      return {
        product: {
          name: productDetails.name,
          description: productDetails.description,
          category: productDetails.category,
          price: productDetails.price,
          image: productDetails.image,
          variations: productDetails.variations,
          total: productTotal, // Total for the current product
        },
        variantDetails,
      };
    }
  }));

  return {
    grandTotal,
    products: productsWithDetails,
  };
};


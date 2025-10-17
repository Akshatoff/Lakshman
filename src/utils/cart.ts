import { prisma } from "@/lib/db/prisma";

export async function mergeGuestCart(userId: string) {
  const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (localCart.length > 0) {
    try {
      // Get or create user's cart
      let cart = await prisma.cart.findUnique({
        where: { userId },
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            userId,
          },
        });
      }

      // Add local items to database cart
      for (const item of localCart) {
        // Check product inventory
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (product && product.inventory >= item.quantity) {
          await prisma.cartItem.upsert({
            where: {
              cartId_productId: {
                cartId: cart.id,
                productId: item.productId,
              },
            },
            update: {
              quantity: {
                increment: item.quantity,
              },
            },
            create: {
              cartId: cart.id,
              productId: item.productId,
              quantity: item.quantity,
            },
          });
        }
      }

      // Clear local cart
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error merging cart:", error);
    }
  }
}

// ═══════════════════════════════════════════════════════════
// ORDER QUERIES — Cart, Orders, and Wishlist
// ═══════════════════════════════════════════════════════════
//
// THE SHOPPING FLOW:
//   1. User browses products
//   2. User adds items to CART (addToCart)
//   3. User views their CART (getCartItems)
//   4. User clicks "Place Order" → cart becomes an ORDER (createOrder)
//   5. User can view their ORDER HISTORY (getOrdersByUser)

import { eq, and, desc } from "drizzle-orm";
import { cart, cartItems, orders, orderItems, wishlist } from "./order-schema";
import { products } from "./schema";
import type { Database } from "./client";

// ═══════════════════════════════════════════
// CART FUNCTIONS
// ═══════════════════════════════════════════

// ─────────────────────────────────────────
// GET OR CREATE CART
// ─────────────────────────────────────────
// Each user has ONE cart. If they don't have one yet, create it.
//
export async function getOrCreateCart(db: Database, userId: number) {
  // Try to find existing cart
  let userCart = await db
    .select()
    .from(cart)
    .where(eq(cart.userId, userId))
    .get();

  // If no cart exists, create one
  if (!userCart) {
    const result = await db
      .insert(cart)
      .values({ userId })
      .returning();
    userCart = result[0];
  }

  return userCart;
}

// ─────────────────────────────────────────
// GET CART ITEMS (with product details)
// ─────────────────────────────────────────
// Returns all items in the user's cart, with product name, image, etc.
//
// Example result:
//   [
//     { id: 1, productId: "FL-1", quantity: 2, price: 8750,
//       product: { name: "Blush Harmony", productImage: "/home/flower1.avif" } },
//     { id: 2, productId: "FL-3", quantity: 1, price: 5750,
//       product: { name: "RedRose Bliss", productImage: "/home/flower3.avif" } }
//   ]
//
export async function getCartItems(db: Database, userId: number) {
  const userCart = await getOrCreateCart(db, userId);

  // innerJoin means: COMBINE cart_items with products
  // So each cart item comes with its product details
  const items = await db
    .select({
      id: cartItems.id,
      productId: cartItems.productId,
      quantity: cartItems.quantity,
      price: cartItems.price,
      productName: products.name,
      productImage: products.productImage,
      productSlug: products.slug,
      inStock: products.inStock,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.cartId, userCart.id))
    .all();

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { items, subtotal };
}

// ─────────────────────────────────────────
// ADD ITEM TO CART
// ─────────────────────────────────────────
// If the product is already in the cart, increase the quantity.
// If not, add a new row.
//
export async function addToCart(
  db: Database,
  userId: number,
  productId: string,
  quantity: number = 1
) {
  const userCart = await getOrCreateCart(db, userId);

  // Check if this product is already in the cart
  const existingItem = await db
    .select()
    .from(cartItems)
    .where(
      and(
        eq(cartItems.cartId, userCart.id),
        eq(cartItems.productId, productId)
      )
    )
    .get();

  // Get the product's current price
  const product = await db
    .select({ price: products.price, inStock: products.inStock })
    .from(products)
    .where(eq(products.id, productId))
    .get();

  if (!product) return { error: "Product not found" };
  if (!product.inStock) return { error: "Product is out of stock" };

  if (existingItem) {
    // Product already in cart → update quantity
    await db
      .update(cartItems)
      .set({ quantity: existingItem.quantity + quantity })
      .where(eq(cartItems.id, existingItem.id));
  } else {
    // New product → insert a new cart item
    await db.insert(cartItems).values({
      cartId: userCart.id,
      productId,
      quantity,
      price: product.price, // Lock in the current price
    });
  }

  return { success: true };
}

// ─────────────────────────────────────────
// REMOVE ITEM FROM CART
// ─────────────────────────────────────────
export async function removeFromCart(db: Database, cartItemId: number) {
  await db.delete(cartItems).where(eq(cartItems.id, cartItemId));
  return { success: true };
}

// ─────────────────────────────────────────
// UPDATE CART ITEM QUANTITY
// ─────────────────────────────────────────
export async function updateCartQuantity(
  db: Database,
  cartItemId: number,
  quantity: number
) {
  if (quantity <= 0) {
    return removeFromCart(db, cartItemId);
  }

  await db
    .update(cartItems)
    .set({ quantity })
    .where(eq(cartItems.id, cartItemId));

  return { success: true };
}

// ═══════════════════════════════════════════
// ORDER FUNCTIONS
// ═══════════════════════════════════════════

// ─────────────────────────────────────────
// CREATE ORDER FROM CART
// ─────────────────────────────────────────
// When user clicks "Place Order":
//   1. Read all cart items
//   2. Create an order row
//   3. Copy cart items → order items
//   4. Empty the cart
//
export async function createOrder(
  db: Database,
  userId: number,
  deliveryType: string = "delivery",
  deliveryAddress?: string
) {
  // Get the cart items
  const { items, subtotal } = await getCartItems(db, userId);

  if (items.length === 0) {
    return { error: "Cart is empty" };
  }

  // Generate a human-readable order number
  // Format: ORD-20250219-XXXXXX
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, ""); // "20250219"
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // "A3B7KF"
  const orderNumber = `ORD-${dateStr}-${randomPart}`;

  const shippingCost = deliveryType === "pickup" ? 0 : 500; // 500 LKR delivery fee
  const totalAmount = subtotal + shippingCost;

  // Create the order
  const orderResult = await db
    .insert(orders)
    .values({
      userId,
      orderNumber,
      subtotal,
      shippingCost,
      totalAmount,
      deliveryType,
      deliveryAddress,
    })
    .returning();

  const newOrder = orderResult[0];

  // Copy cart items into order items
  for (const item of items) {
    await db.insert(orderItems).values({
      orderId: newOrder.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    });
  }

  // Clear the cart
  const userCart = await getOrCreateCart(db, userId);
  await db.delete(cartItems).where(eq(cartItems.cartId, userCart.id));

  return { order: newOrder };
}

// ─────────────────────────────────────────
// GET ORDERS FOR A USER
// ─────────────────────────────────────────
// Returns all orders, newest first.
//
export async function getOrdersByUser(db: Database, userId: number) {
  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt))
    .all();

  // For each order, get its items with product details
  const ordersWithItems = await Promise.all(
    userOrders.map(async (order) => {
      const items = await db
        .select({
          id: orderItems.id,
          productId: orderItems.productId,
          quantity: orderItems.quantity,
          price: orderItems.price,
          productName: products.name,
          productImage: products.productImage,
        })
        .from(orderItems)
        .innerJoin(products, eq(orderItems.productId, products.id))
        .where(eq(orderItems.orderId, order.id))
        .all();

      return { ...order, items };
    })
  );

  return ordersWithItems;
}

// ═══════════════════════════════════════════
// WISHLIST FUNCTIONS
// ═══════════════════════════════════════════

// ─────────────────────────────────────────
// GET WISHLIST
// ─────────────────────────────────────────
export async function getWishlist(db: Database, userId: number) {
  return db
    .select({
      id: wishlist.id,
      productId: wishlist.productId,
      addedAt: wishlist.addedAt,
      productName: products.name,
      productImage: products.productImage,
      productPrice: products.price,
      productSlug: products.slug,
      inStock: products.inStock,
    })
    .from(wishlist)
    .innerJoin(products, eq(wishlist.productId, products.id))
    .where(eq(wishlist.userId, userId))
    .all();
}

// ─────────────────────────────────────────
// ADD TO WISHLIST
// ─────────────────────────────────────────
export async function addToWishlist(
  db: Database,
  userId: number,
  productId: string
) {
  // Check if already in wishlist
  const existing = await db
    .select()
    .from(wishlist)
    .where(
      and(eq(wishlist.userId, userId), eq(wishlist.productId, productId))
    )
    .get();

  if (existing) return { error: "Already in wishlist" };

  await db.insert(wishlist).values({ userId, productId });
  return { success: true };
}

// ─────────────────────────────────────────
// REMOVE FROM WISHLIST
// ─────────────────────────────────────────
export async function removeFromWishlist(db: Database, wishlistId: number) {
  await db.delete(wishlist).where(eq(wishlist.id, wishlistId));
  return { success: true };
}

export async function removeProductFromWishlist(db: Database, userId: number, productId: string) {
  await db.delete(wishlist).where(
    and(eq(wishlist.userId, userId), eq(wishlist.productId, productId))
  );
  return { success: true };
}

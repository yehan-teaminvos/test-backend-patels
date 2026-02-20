// ═══════════════════════════════════════════════════════════
// /api/orders
// ═══════════════════════════════════════════════════════════
// GET  /api/orders → get my order history
// POST /api/orders → place a new order (checkout)

import { NextResponse } from "next/server";
import { getDb } from "@/lib/get-db";
import { getSession } from "@/lib/auth";
import { createOrder, getOrdersByUser } from "@/db/order-queries";

// ─── GET: My order history ───
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please log in" }, { status: 401 });
    }

    const db = await getDb();
    const orders = await getOrdersByUser(db, session.userId);
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Orders GET error:", error);
    return NextResponse.json({ error: "Failed to get orders" }, { status: 500 });
  }
}

// ─── POST: Place order (checkout) ───
// Body: { "deliveryType": "delivery", "deliveryAddress": "123 Main St, Colombo" }
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please log in" }, { status: 401 });
    }

    const body = (await request.json()) as { deliveryType?: string; deliveryAddress?: string };
    const { deliveryType, deliveryAddress } = body;

    const db = await getDb();
    const result = await createOrder(
      db,
      session.userId,
      deliveryType || "delivery",
      deliveryAddress
    );

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Orders POST error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

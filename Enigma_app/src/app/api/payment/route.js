import dbConnect from '@/lib/dbConnect';
import Payment from '@/lib/models/payment';
import Cart from '@/lib/models/cart';
import { NextResponse } from 'next/server';

const GET = async (req) => {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const skip = (page - 1) * limit;

        // Get all payment records
        const payments = await Payment.find({});

        // Collect all unique cart IDs from payment records
        const cartIds = payments
            .filter(payment => payment.cartId) // Ensure cartId exists
            .map(payment => payment.cartId);

        // Fetch carts based on cartIds, sorted by status, and implement pagination
        const carts = await Cart.find({ _id: { $in: cartIds } })
            .sort({ status: 1 }) // Sort by status (you can use '1' for ascending, '-1' for descending)
            .skip(skip)           // Skip the first 'skip' records
            .limit(limit);        // Limit the number of records returned

        // Fetch total number of carts (for pagination metadata)
        const totalCarts = await Cart.countDocuments({ _id: { $in: cartIds } });

        // Combine the cart data and payment data into one response
        const result = carts.map(cart => {
            // Find the corresponding payment for this cart
            const payment = payments.find(payment => payment.cartId.toString() === cart._id.toString());

            return {
                cart: {
                    user: cart.user,
                    items: cart.items, // Items are already in the cart
                    status: cart.status
                },
                payment
            };
        });

        return NextResponse.json({
            data: result,
            pagination: {
                page,
                limit,
                totalPages: Math.ceil(totalCarts / limit),
                totalCarts
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


const POST = async (req) => {
  await dbConnect();

  try {
    const { addr, cartId, phone } = await req.json();

    try {
      const response = await fetch(`/api/cart`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartId: cartId,
          status: 'ORDERED',
        }),
      });

      if (!response.ok) {
        console.error('Cart update failed:', await response.json());
        return NextResponse.json({ error: 'Cart update failed' }, { status: 500 });
      }

      const cartData = await response.json();
      console.log('Cart updated successfully:', cartData);

      const payment = await Payment.create({
        addr,
        cartId,
        phone,
      });

      return NextResponse.json({ message: 'Payment and cart update successful', payment });
    } catch (error) {
      console.error('Error updating cart:', error);
      return NextResponse.json({ error: 'Failed to update cart', details: error.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json({ error: 'Payment creation failed', details: error.message }, { status: 500 });
  }
};

export {GET, POST};

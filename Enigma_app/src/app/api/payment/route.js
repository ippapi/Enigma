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

    // Get all payment records and populate the cartId field (cart data will be populated directly)
    const payments = await Payment.find({})
      .populate('cartId')  // Populate cartId with the related Cart document
      .skip(skip)          // Apply pagination
      .limit(limit);       // Limit the number of records returned

    // Define custom sort order for cart status
    const statusOrder = {
      "ORDERED": 1,
      "COMPLETED": 2,
      "CANCELED": 3
    };

    // Sort the payments by the status of the populated cart
    const sortedPayments = payments.filter(payment => payment.cartId) // Filter out payments without cartId
      .sort((a, b) => {
        const statusA = a.cartId.status;
        const statusB = b.cartId.status;
        return statusOrder[statusA] - statusOrder[statusB];
      });

    // Calculate total number of payments for pagination metadata
    const totalPayments = await Payment.countDocuments();

    const result = sortedPayments.map(payment => {
      return {
          id: payment._id,
          cartId: payment.cartId, // Ensure this is populated
          phone: payment.phone,
          address: payment.addr,
          totalPrice: payment.totalPrice, // Total price from the payment
        }
    });

    return NextResponse.json({
      data: result,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalPayments / limit),
        totalPayments
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};


const POST = async (req) => {
  await dbConnect();

  try {
    const { addr, cartId, phone } = await req.json();
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/api/cart`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
};

const PATCH = async (req) => {
  await dbConnect();

  try {
    const { cartId, status } = await req.json();
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/api/cart`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        cartId: cartId,
        status: status,
      }),
    });

    if (!response.ok) {
      console.error('Order update failed:', await response.json());
      return NextResponse.json({ error: 'Order update failed' }, { status: 500 });
    }

    const cartData = await response.json();

    return NextResponse.json({ message: 'Order update successful', cartData });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ error: 'Failed to update order', details: error.message }, { status: 500 });
  }
};


export {GET, POST, PATCH};

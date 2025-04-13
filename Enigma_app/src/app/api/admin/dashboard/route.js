import dbConnect from "@/lib/dbConnect";
import Order from "@/lib/models/cart";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

const GET = async (req) => {
    await dbConnect();

    try {
        const url = new URL(req.url);
        const fromDate = new Date(url.searchParams.get("from") || new Date(new Date().setDate(new Date().getDate() - 30)));
        const toDate = new Date(url.searchParams.get("to") || new Date());

        fromDate.setUTCHours(0, 0, 0, 0);
        toDate.setUTCHours(23, 59, 59, 999);

        const sales = await Order.aggregate([
            {
              $match: {
                createdAt: { $gte: fromDate, $lte: toDate },
                status: "COMPLETED",
              },
            },
            {
              $unwind: "$items",
            },
            {
              $lookup: {
                from: "products",
                localField: "items.product",
                foreignField: "_id",
                as: "productDetails",
              },
            },
            {
              $unwind: "$productDetails",
            },
            {
              $addFields: {
                totalPricePerItem: {
                  $multiply: ["$items.quantity", "$productDetails.price"],
                },
              },
            },
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                sales: { $sum: "$totalPricePerItem" },
              },
            },
            {
              $sort: { _id: 1 },
            },
        ]);
          

        const users = await User.aggregate([
            { $match: { createdAt: { $gte: fromDate, $lte: toDate } } },
            { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, users: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        const orders = await Order.aggregate([
            { $match: { createdAt: { $gte: fromDate, $lte: toDate }, status: "ORDERED" } },
            { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, orders: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        return NextResponse.json({
            sales: sales.map(({ _id, sales }) => ({ name: _id, sales })),
            users: users.map(({ _id, users }) => ({ name: _id, users })),
            orders: orders.map(({ _id, orders }) => ({ name: _id, orders }))
        }, {status: 200});
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
    }
};

export { GET };

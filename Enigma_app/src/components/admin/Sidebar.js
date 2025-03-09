"use client";

import Image from "next/image";
import Link from "next/link";

const adminSideBarLinks = [
    { img: "/icons/admin/home.svg", route: "/admin", text: "Home" },
    { img: "/icons/admin/user.svg", route: "/admin/user", text: "User manage" },
    { img: "/icons/admin/reader.svg", route: "/admin/reader", text: "Reader manage" },
    { img: "/icons/admin/booking.svg", route: "/admin/booking", text: "Booking manage" },
    { img: "/icons/admin/order.svg", route: "/admin/order", text: "Order manage" },
    { img: "/icons/admin/product.svg", route: "/admin/product", text: "Product manage" },
];

const Sidebar = () => {
    return (
        <div className="admin-sidebar p-4 bg-gray-100 h-screen flex flex-col justify-between">
            <div>
                <h1 className="text-center text-xl font-bold">Enigma</h1>

                <div className="mt-10 flex flex-col gap-2">
                    {adminSideBarLinks.map((link) => {
                        return (<Link href={link.route} key={link.route} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200">
                            <div className="relative size-5">
                                <Image
                                    src={link.img}
                                    alt="icon"
                                    fill
                                />
                            </div>
                            <p>
                                {link.text}
                            </p>
                      </Link>);
                    })}
                </div>
            </div>

        <div className="p-4 bg-gray-200 rounded-lg text-center font-semibold">
            Hi, admin!
        </div>
    </div>);
};

export default Sidebar;

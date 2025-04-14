"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/user/imageUploader";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [orderedOrders, setOrderedOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const profileRes = await fetch("/api/user", { credentials: "include" });
      const profileData = await profileRes.json();
      if(profileData.status === 403)
        router.route('/auth');
      setUser(profileData);
      setFormData(profileData);

      const [ordered, completed] = await Promise.all([
        fetch("/api/cart?status=ORDERED", { credentials: "include" }),
        fetch("/api/cart?status=COMPLETED", { credentials: "include" }),
      ]);
      const {carts: orderedData} = await ordered.json();
      const {carts: completedData} = await completed.json();

      if (Array.isArray(orderedData)) setOrderedOrders(orderedData);
      if (Array.isArray(completedData)) setCompletedOrders(completedData);

      setLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Cập nhật thành công");
      setUser(data);
    } else if(res.status === 403){
      router.route('/auth')
    } else {
      alert("Lỗi: " + data.error);
    }
  };

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      router.push("/auth");
    } else {
      alert("Đăng xuất thất bại!");
    }
  };

  if (loading) return <p className="p-6">⏳ Đang tải dữ liệu...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">👤 Thông tin cá nhân</h2>

      {/* FORM */}
      <div className="space-y-4">
        <ImageUploader currentImage={formData.profilePicture}/>
        <input
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Tên"
        />
        <input
          name="role"
          value={formData.role || ""}
          disabled
          className="w-full border p-2 rounded"
          placeholder="Role"
        />
        <input
          value={formData.email || ""}
          disabled
          className="w-full border p-2 rounded bg-gray-100"
        />
        <input
          name="bio"
          value={formData.bio || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Bio"
        />

        <div className="flex justify-between gap-4">
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            💾 Cập nhật
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            🚪 Đăng xuất
          </button>
        </div>
      </div>

    {/* ĐƠN HÀNG */}
    <div className="space-y-6">
      {/* Đơn hàng đang giao */}
      <div>
        <h3 className="text-xl font-semibold text-yellow-600">📦 Đơn hàng đang giao</h3>
        {orderedOrders.length > 0 ? (
          <ul className="space-y-4">
            {orderedOrders.map((order, idx) => (
              <li key={idx} className="border rounded p-4">
                <p className="font-semibold mb-2">Đơn hàng {idx + 1}</p>
                <ul className="space-y-1">
                  {order.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <span>{item.product?.name}</span> - <span>Số lượng: {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có đơn hàng nào đang giao.</p>
        )}
      </div>

      {/* Lịch sử đơn hàng */}
      <div>
        <h3 className="text-xl font-semibold text-green-700">🧾 Lịch sử đơn hàng</h3>
        {completedOrders.length > 0 ? (
          <ul className="space-y-4">
            {completedOrders.map((order, idx) => (
              <li key={idx} className="border rounded p-4 bg-gray-50">
                <p className="font-semibold mb-2">Đơn hàng {idx + 1}</p>
                <ul className="space-y-1">
                  {order.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <span>{item.product?.name}</span> - <span>Số lượng: {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có đơn hàng nào đã giao.</p>
        )}
      </div>
    </div>

    </div>
  );
}

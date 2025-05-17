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

  if (loading) return <p className="mt-20 text-center min-h-screen">⏳ Đang tải dữ liệu...</p>;

  return (
    <div className="min-h-screen mt-20 text-white">
      <div>
        <div className="pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Profile Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl text-white font-bold text-slate-800 mb-4 animate-fade-in">
              👋 Xin chào, {user?.name}!
            </h1>
            <div className="inline-flex items-center bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-slate-600 font-medium">Đang hoạt động</span>
            </div>
          </div>

          {/* Profile Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Form */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <svg 
                    className="w-6 h-6 mr-2 text-blue-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                  Thông tin cá nhân
                </h2>
                
                <div>
                  <ImageUploader currentImage={formData.profilePicture} />
                  
                  <div className="grid md:grid-cols-2 gap-4 text-black">
                    <div className="relative">
                      <input
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border-0 rounded-lg bg-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Họ và tên"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                        👤
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        value={formData.email || ""}
                        disabled
                        className="w-full pl-12 pr-4 py-3 border-0 rounded-lg bg-slate-100 text-slate-600"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                        📧
                      </span>
                    </div>

                    <div className="relative md:col-span-2">
                      <textarea
                        name="bio"
                        value={formData.bio || ""}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border-0 rounded-lg bg-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Giới thiệu bản thân"
                        rows="3"
                      />
                      <span className="absolute left-4 top-4 text-slate-500">
                        📝
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end flex-wrap">
                    <button
                      onClick={handleUpdate}
                      className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                    >
                      <svg 
                        className="w-5 h-5 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      Cập nhật
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
                    >
                      <svg 
                        className="w-5 h-5 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                        />
                      </svg>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Orders */}
            <div className="space-y-8">
              {/* Current Orders */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <svg 
                    className="w-6 h-6 mr-2 text-yellow-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  Đơn hàng đang giao
                </h3>
                
                {orderedOrders.length > 0 ? (
                  <div className="space-y-4">
                    {orderedOrders.map((order, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-slate-700">Đơn hàng #{order._id.slice(-4)}</p>
                            <p className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">Đang vận chuyển</span>
                        </div>
                        <div className="space-y-2">
                          {order.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex justify-between text-sm">
                              <span className="text-slate-600">{item.product?.name}</span>
                              <span className="text-slate-500">x{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-6 bg-slate-50 rounded-lg">
                    <p className="text-slate-400">📭 Không có đơn hàng nào đang giao</p>
                  </div>
                )}
              </div>

              {/* Order History */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <svg 
                    className="w-6 h-6 mr-2 text-green-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  Lịch sử đơn hàng
                </h3>
                
                {completedOrders.length > 0 ? (
                  <div className="space-y-4">
                    {completedOrders.slice(0, 3).map((order, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-lg group hover:bg-slate-100 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-slate-700">Đơn hàng #{order._id.slice(-4)}</p>
                            <p className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Hoàn thành</span>
                        </div>
                        <div className="space-y-2">
                          {order.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex justify-between text-sm">
                              <span className="text-slate-600">{item.product?.name}</span>
                              <span className="text-slate-500">x{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-6 bg-slate-50 rounded-lg">
                    <p className="text-slate-400">📦 Chưa có đơn hàng nào hoàn thành</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

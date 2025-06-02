"use client";

import { useState, useEffect } from "react";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(10); // Không cần thay đổi limit nếu luôn là 10
    const [totalUsers, setTotalUsers] = useState(0);
    const [promoting, setPromoting] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, [page, searchQuery]);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });

            if (searchQuery) {
                if (searchQuery.includes("@")) {
                    params.append("email", searchQuery);
                } else if (searchQuery.match(/^[0-9a-fA-F]{24}$/)) {
                    params.append("id", searchQuery);
                } else {
                    params.append("name", searchQuery);
                }
            }

            const response = await fetch(`/api/user/promote?${params.toString()}`);
            const data = await response.json();

            if (response.ok) {
                setUsers(data.users || []);
                setTotalUsers(data.total || 0);
            } else {
                throw new Error(data.error || "Failed to fetch users");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); // Reset về trang 1 khi tìm kiếm
    };

    const handlePromote = async (userId, newRole) => {
        setPromoting(userId);
        try {
            const response = await fetch(`/api/user/promote`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, newRole }),
            });

            const data = await response.json();
            if (response.ok) {
                setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
            } else {
                throw new Error(data.error || "Failed to promote user");
            }
        } catch (error) {
            alert(`Error promoting user: ${error.message}`);
        } finally {
            setPromoting(null);
        }
    };

    const totalPages = Math.ceil(totalUsers / limit);

    return (
        <div className="p-4 pt-2">
            <h2 className="text-xl font-bold mb-4">User Management</h2>

            {/* Search */}
            <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by ID, Name, or Email"
                    className="border p-2 flex-1"
                />
                <button type="submit" className="bg-custom-purple rounded text-white p-2">
                    Search
                </button>
            </form>

            {/* Table */}
            {loading ? (
                <p>Loading users...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2 w-32">ID</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Role</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id} className="border">
                                    <td className="border p-2 text-xs">{user._id.slice(0, 10)}...</td>
                                    <td className="border p-2">{user.name}</td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2">{user.role}</td>
                                    <td className="border p-2 flex gap-2">
                                        {user.role === "USER" && (
                                            <button
                                                onClick={() => handlePromote(user._id, "READER")}
                                                className="bg-green-500 text-white p-1 text-sm"
                                                disabled={promoting === user._id}
                                            >
                                                {promoting === user._id ? "Promoting..." : "Promote to READER"}
                                            </button>
                                        )}
                                        {user.role === "READER" && (
                                            <button
                                                onClick={() => handlePromote(user._id, "USER")}
                                                className="bg-red-500 text-white p-1 text-sm"
                                                disabled={promoting === user._id}
                                            >
                                                {promoting === user._id ? "Demoting..." : "Demote to USER"}
                                            </button>
                                        )}
                                        {user.role === "ADMIN" && <p>Hello admin!</p>}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-4">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={page <= 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="bg-gray-300 p-2 disabled:opacity-50"
                >
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="bg-gray-300 p-2 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserManagement;

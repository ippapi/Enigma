import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

const Layout = ({ children }) => {
    return (
        <main className="flex min-h-screen w-full">
            <Sidebar />
    
            {/* Main Content Area */}
            <div className="flex flex-col flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 relative">
                {/* Fixed Header inside Layout */}
                <div className="fixed top-5 left-64 right-0 z-50 w-[calc(100%-16rem)] w-max-6xl">
                    <div className="ml-5 mr-5">
                        <Header />
                    </div>
                </div>
    
                {/* Main Content (Adds padding to avoid overlap with fixed header) */}
                <div className="mt-20 px-20 py-10">
                    {children}
                </div>
            </div>
        </main>
    );
};

export default Layout;
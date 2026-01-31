import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, loading, logout } = useAuth();

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (!user) return <Navigate to="/admin/login" />;

  const navLinks = [
    { href: "/admin/home", label: "Home" },
    { href: "/admin/about", label: "About" },
    { href: "/admin/work", label: "Work" },
    { href: "/admin/contact", label: "Contact" },
    { href: "/admin/cv", label: "CV" },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <nav className="fixed inset-x-0 top-0 z-50 bg-primary/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 text-xl font-bold text-white">
                Admin Panel
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.href}
                      to={link.href}
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-white/10 text-white'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={logout}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

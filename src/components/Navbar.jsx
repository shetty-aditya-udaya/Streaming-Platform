import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-netflixBlack' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
            <div className="flex items-center justify-between px-4 md:px-16 py-4">
                <div className="flex items-center space-x-8">
                    <Link to="/">
                        <h1 className="text-netflixRed text-2xl md:text-3xl font-bold cursor-pointer">NETFLIX</h1>
                    </Link>
                    <ul className="hidden md:flex space-x-4 text-sm text-gray-300">
                        <li className="hover:text-white cursor-pointer">Home</li>
                        <li className="hover:text-white cursor-pointer">TV Shows</li>
                        <li className="hover:text-white cursor-pointer">Movies</li>
                        <li className="hover:text-white cursor-pointer">New & Popular</li>
                        <li className="hover:text-white cursor-pointer">My List</li>
                    </ul>
                </div>

                <div className="flex items-center space-x-4 text-white">
                    <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />
                    <span className="hidden md:block text-sm">Valid User</span>
                    <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" />

                    <div className="group relative">
                        <div className="flex items-center cursor-pointer gap-2">
                            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
                                <User className="w-5 h-5" />
                            </div>
                        </div>
                        {/* Dropdown */}
                        <div className="absolute right-0 mt-2 w-32 bg-black border border-gray-700 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="py-1">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

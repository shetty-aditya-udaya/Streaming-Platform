import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const success = await login(email, password);
            if (success) {
                navigate('/');
            } else {
                setError('Failed to log in. Please check your credentials.');
            }
        } catch (err) {
            setError('Failed to log in.');
        }
    };

    return (
        <div className="w-full h-screen">
            <div className="hidden sm:block absolute top-0 left-0 w-full h-full">
                <img
                    className="w-full h-full object-cover opacity-50"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                    alt="Netflix Background"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="fixed w-full px-4 py-24 z-50">
                <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white rounded-lg">
                    <div className="max-w-[320px] mx-auto py-16">
                        <h1 className="text-3xl font-bold">Sign In</h1>
                        {error && <p className="p-3 bg-red-500 my-2 text-sm rounded">{error}</p>}

                        <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-3 my-2 bg-gray-700 rounded outline-none focus:bg-gray-600 focus:ring-2 focus:ring-netflixRed"
                                type="email"
                                placeholder="Email"
                                autoComplete="email"
                                required
                            />
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-3 my-2 bg-gray-700 rounded outline-none focus:bg-gray-600 focus:ring-2 focus:ring-netflixRed"
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                required
                            />
                            <button className="bg-netflixRed py-3 my-6 rounded font-bold hover:bg-red-700 transition duration-300">
                                Sign In
                            </button>

                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <p><input className="mr-2" type="checkbox" />Remember me</p>
                                <p className="cursor-pointer hover:underline">Need Help?</p>
                            </div>

                            <p className="py-8">
                                <span className="text-gray-500">New to Netflix?</span>{' '}
                                <Link to="/signup" className="text-white hover:underline">
                                    Sign Up now.
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

import { useState, useEffect } from 'react';
import { getMovieDetails } from '../services/omdbApi';
import { Play, Info } from 'lucide-react';

const Hero = () => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeroMovie = async () => {
            // Fetching "Avengers: Endgame" as the featured movie (ID: tt4154796)
            // Or "Interstellar" (ID: tt0816692) - let's go with Interstellar for the visuals
            const data = await getMovieDetails('tt0816692');
            setMovie(data);
            setLoading(false);
        };

        fetchHeroMovie();
    }, []);

    if (loading) return <div className="h-[56.25vw] bg-black"></div>;
    if (!movie) return null;

    return (
        <div className="relative w-full h-[56.25vw] max-h-[85vh] text-white">
            <div className="absolute top-0 left-0 w-full h-full">
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : ''}
                    alt={movie.Title}
                    className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>

            <div className="absolute top-[20%] md:top-[30%] left-4 md:left-16 w-full md:w-[40%]">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{movie.Title}</h1>

                <div className="flex items-center space-x-4 mb-4 text-sm md:text-base font-semibold text-gray-300">
                    <span className="text-green-500">99% Match</span>
                    <span>{movie.Year}</span>
                    <span className="border border-gray-500 px-1 rounded">{movie.Rated}</span>
                    <span>{movie.Runtime}</span>
                </div>

                <p className="text-sm md:text-lg text-gray-200 mb-6 drop-shadow-md line-clamp-3 md:line-clamp-none">
                    {movie.Plot}
                </p>

                <div className="flex items-center space-x-3">
                    <button className="bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded font-bold flex items-center hover:bg-opacity-80 transition">
                        <Play className="w-5 h-5 mr-2 fill-black" />
                        Play
                    </button>
                    <button className="bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 rounded font-bold flex items-center hover:bg-gray-500/50 transition backdrop-blur-sm">
                        <Info className="w-5 h-5 mr-2" />
                        More Info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;

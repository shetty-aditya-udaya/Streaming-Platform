import { useEffect, useState, useRef } from 'react';
import { searchMovies } from '../services/omdbApi';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MovieRow = ({ title, query }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const rowRef = useRef(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            // Fetch specifically for the query (using keywords to simulate categories)
            const results = await searchMovies(query);
            if (results && results.length > 0) {
                setMovies(results);
            }
            setLoading(false);
        };

        fetchMovies();
    }, [query]);

    const slide = (offset) => {
        if (rowRef.current) {
            rowRef.current.scrollLeft += offset;
        }
    };

    if (loading) return <div className="h-40 md:h-60 flex items-center justify-center"><div className="w-8 h-8 border-4 border-netflixRed border-t-transparent rounded-full animate-spin"></div></div>;
    if (!movies.length) return null;

    return (
        <div className="mb-8 px-4 md:px-12 group">
            <h2 className="text-white text-lg md:text-xl font-bold mb-4 hover:text-gray-300 transition-colors cursor-pointer inline-flex items-center gap-2">
                {title}
                <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore All &gt;</span>
            </h2>

            <div className="relative group/row">
                <button
                    className="absolute left-0 top-0 bottom-0 z-40 bg-black/50 hover:bg-black/70 text-white w-12 hidden group-hover/row:flex items-center justify-center transition-all duration-300 h-full rounded-r-lg opacity-0 group-hover/row:opacity-100"
                    onClick={() => slide(-500)}
                >
                    <ChevronLeft size={32} />
                </button>

                <div
                    ref={rowRef}
                    className="flex overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide py-4 space-x-2 md:space-x-4 pr-12 no-scrollbar"
                >
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>

                <button
                    className="absolute right-0 top-0 bottom-0 z-40 bg-black/50 hover:bg-black/70 text-white w-12 hidden group-hover/row:flex items-center justify-center transition-all duration-300 h-full rounded-l-lg opacity-0 group-hover/row:opacity-100"
                    onClick={() => slide(500)}
                >
                    <ChevronRight size={32} />
                </button>
            </div>
        </div>
    );
};

export default MovieRow;

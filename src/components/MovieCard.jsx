import { useState } from 'react';

const MovieCard = ({ movie }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Fallback for missing poster
    const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';

    return (
        <div
            className="relative w-[160px] sm:w-[200px] md:w-[240px] h-[240px] sm:h-[300px] md:h-[360px] inline-block cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:z-10 bg-gray-900 rounded-md overflow-hidden mr-2 md:mr-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={poster}
                alt={movie.Title}
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
            />

            {/* Hover Overlay */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-2 md:p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end h-full`}>
                <h3 className="text-white text-sm md:text-base font-bold truncate">{movie.Title}</h3>
                <div className="flex items-center space-x-2 mt-1">
                    <span className="text-green-400 text-xs font-semibold">98% Match</span>
                    <span className="text-gray-400 text-xs border border-gray-600 px-1 rounded">{movie.Type === 'series' ? 'TV' : 'HD'}</span>
                    <span className="text-gray-400 text-xs">{movie.Year}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;

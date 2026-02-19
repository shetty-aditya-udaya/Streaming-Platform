import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';

const Landing = () => {
    return (
        <div className="bg-black min-h-screen text-white pb-20">
            <Navbar />
            <Hero />

            <div className="relative z-10 -mt-20 md:-mt-32 space-y-8 pl-4 md:pl-0">
                <MovieRow title="Trending Now" query="avengers" />
                <MovieRow title="Top Rated" query="star wars" />
                <MovieRow title="Action Movies" query="impossible" />
                <MovieRow title="Comedy Hits" query="hangover" />
                <MovieRow title="Sci-Fi Blockbusters" query="matrix" />
            </div>
        </div>
    );
};

export default Landing;

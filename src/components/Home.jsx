import React, { useEffect, useState, useRef } from "react";
import TrendingCarousel from "../components/TrendingCarousel";
import FeaturedVideo from "../components/FeaturedVideo";

const SESSION_STORAGE_KEY = "lastWatchedMovies";

const Home = () => {
    const [data, setData] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showVideo, setShowVideo] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/data.json");
            const json = await res.json();

            const lastWatched = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY)) || [];

            const sortedTrending = [...json.TrendingNow].sort((a, b) => {
                const aIndex = lastWatched.indexOf(a.Id);
                const bIndex = lastWatched.indexOf(b.Id);
                if (aIndex === -1 && bIndex === -1) return 0;
                if (aIndex === -1) return 1;
                if (bIndex === -1) return -1;
                return aIndex - bIndex;
            });

            setData({
                ...json,
                TrendingNow: sortedTrending,
            });

            if (lastWatched.length > 0) {
                const lastMovie = sortedTrending.find((m) => m.Id === lastWatched[0]);
                setSelectedMovie(lastMovie || json.Featured);
            } else {
                setSelectedMovie(json.Featured);
            }
            setShowVideo(false);
        };

        fetchData();
    }, []);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
        setShowVideo(false);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            setShowVideo(true);
        }, 2000);

        const lastWatched = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY)) || [];
        const updated = [movie.Id, ...lastWatched.filter((id) => id !== movie.Id)];
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated));

        setData((prevData) => {
            if (!prevData) return prevData;
            const sortedTrending = [...prevData.TrendingNow].sort((a, b) => {
                const aIndex = updated.indexOf(a.Id);
                const bIndex = updated.indexOf(b.Id);
                if (aIndex === -1 && bIndex === -1) return 0;
                if (aIndex === -1) return 1;
                if (bIndex === -1) return -1;
                return aIndex - bIndex;
            });
            return { ...prevData, TrendingNow: sortedTrending };
        });
    };

    if (!data || !selectedMovie) return <div className="text-white p-4">Loading...</div>;

    return (
        <div className="bg-black min-h-screen">
            <FeaturedVideo movie={selectedMovie} showVideo={showVideo} />
            <TrendingCarousel movies={data.TrendingNow} onClick={handleMovieClick} />
        </div>
    );
};

export default Home;

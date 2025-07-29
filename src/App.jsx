import { useEffect, useState } from "react";
import FeaturedVideo from "./components/FeaturedVideo.jsx";
import TrendingCarousel from "./components/TrendingCarousel.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
    const [featured, setFeatured] = useState(null);
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/Featured")
            .then((res) => res.json())
            .then((data) => setFeatured(data));

        fetch("http://localhost:4000/TrendingNow")
            .then((res) => res.json())
            .then((data) => {
                const stored = sessionStorage.getItem("lastViewed");
                if (stored) {
                    const viewedIds = JSON.parse(stored);
                    data.sort((a, b) => {
                        const aIdx = viewedIds.indexOf(a.Id);
                        const bIdx = viewedIds.indexOf(b.Id);
                        if (aIdx === -1) return 1;
                        if (bIdx === -1) return -1;
                        return aIdx - bIdx;
                    });
                }
                setTrending(data.slice(0, 50));
            });
    }, []);

    const handleMovieClick = (movie) => {
        setFeatured(movie);
        setTimeout(() => {
            setFeatured({ ...movie, showVideo: true });
        }, 2000);

        const stored = sessionStorage.getItem("lastViewed");
        let viewedIds = stored ? JSON.parse(stored) : [];
        viewedIds = viewedIds.filter((id) => id !== movie.Id);
        viewedIds.unshift(movie.Id);
        sessionStorage.setItem("lastViewed", JSON.stringify(viewedIds));
    };

    if (!featured) return <div>Loading...</div>;

    return (
        <div>
            <FeaturedVideo movie={featured} />
            <Sidebar/>
            <TrendingCarousel movies={trending} onClick={handleMovieClick} />
        </div>
    );
}

export default App;

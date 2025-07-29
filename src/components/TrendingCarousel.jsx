    import React, { useRef, useState } from "react";

    const TrendingCarousel = ({ movies, onClick }) => {
        const trackRef = useRef(null);
        const [isDragging, setIsDragging] = useState(false);
        const [startX, setStartX] = useState(0);
        const [scrollLeft, setScrollLeft] = useState(0);

        const handleDragStart = (e) => {
            setIsDragging(true);
            setStartX(e.pageX - trackRef.current.offsetLeft);
            setScrollLeft(trackRef.current.scrollLeft);
        };

        const handleDragEnd = () => setIsDragging(false);

        const handleDragMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - trackRef.current.offsetLeft;
            const walk = (x - startX) * 2;
            trackRef.current.scrollLeft = scrollLeft - walk;
        };

        const scrollNext = () => {
            if (trackRef.current) {
                trackRef.current.scrollBy({ left: 300, behavior: "smooth" });
            }
        };

        const scrollPrev = () => {
            if (trackRef.current) {
                trackRef.current.scrollBy({ left: -300, behavior: "smooth" });
            }
        };

        return (
            <div className="bg-black py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-white mb-4">Trending Now</h2>
                    <div className="relative">
                        <div
                            ref={trackRef}
                            onMouseDown={handleDragStart}
                            onMouseUp={handleDragEnd}
                            onMouseLeave={handleDragEnd}
                            onMouseMove={handleDragMove}
                            style={{ cursor: isDragging ? "grabbing" : "grab" }}
                            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-2 px-2 snap-x snap-mandatory"
                        >
                            {movies.slice(0, 50).map((movie) => (
                                <div
                                    key={movie.Id}
                                    className="flex-none w-40 h-60 rounded-lg overflow-hidden snap-start cursor-pointer"
                                    onClick={() => onClick(movie)}
                                >
                                    <img
                                        src={`/src/assets/${movie.CoverImage}`}
                                        alt={movie.Title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        draggable={false}
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        );
    };

    export default TrendingCarousel;

import React from "react";

const FeaturedVideo = ({ movie, showVideo }) => {
    const hasVideo = showVideo && !!movie?.VideoUrl;

    return (
        <div className="relative w-full h-screen text-white">
            {hasVideo ? (
                <video
                    className="absolute w-full h-full object-cover"
                    src={movie.VideoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            ) : (
                <img
                    className="absolute w-full h-full object-cover object-center"
                    src={`/${movie.CoverImage}`}
                    alt={movie.Title}
                />
            )}

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-black/70 to-transparent" />

            <div className="relative z-10 flex flex-col top-[100px] h-[500px] pl-30 w-[700px]">
                <p className="text-[20px] uppercase opacity-70">{movie.Category}</p>

                {movie.TitleImage ? (
                    <img
                        className="w-[500px] mb-4"
                        src={`/${movie.TitleImage}`}
                        alt={movie.Title}
                    />
                ) : (
                    <h1 className="text-4xl font-bold mb-4">{movie.Title}</h1>
                )}

                <div className="flex items-center gap-4 text-sm mb-4 opacity-80">
                    <span>{movie.ReleaseYear}</span>
                    <span>{movie.MpaRating}</span>
                    <span>{formatDuration(movie.Duration)}</span>
                </div>

                <p className="text-sm mb-6 opacity-90 line-clamp-4">{movie.Description}</p>

                <div className="flex gap-4">
                    <button className="bg-white text-black px-6 py-2 rounded-[30px] hover:bg-white/30 w-[150px] transition">
                        ▶ Play
                    </button>
                    <button className="bg-blue-800 text-white px-6 py-2 rounded-[30px] hover:bg-white/30 w-[150px] transition">
                        More Info
                    </button>
                </div>
            </div>
        </div>
    );
};


function formatDuration(seconds) {
    const secNum = parseInt(seconds, 10);
    const h = Math.floor(secNum / 3600);
    const m = Math.floor((secNum % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default FeaturedVideo;

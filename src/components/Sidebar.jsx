import { useState } from 'react';

import SearchIcon from '../../public/icons/ICON - Search.png';
import HomeIcon from '../../public/icons/Group 46.png';
import TvIcon from '../../public/icons/Group 56.png';
import MoviesIcon from '../../public/icons/Group 54.png';
import GenresIcon from '../../public/icons/Group 53.png';
import WatchLaterIcon from '../../public/icons/Group 47.png';
import UserAvatar from '../../public/avatar.jpg';

const menuIcons = [
    { icon: SearchIcon, label: 'Search' },
    { icon: HomeIcon, label: 'Home' },
    { icon: TvIcon, label: 'TV Shows' },
    { icon: MoviesIcon, label: 'Movies' },
    { icon: GenresIcon, label: 'Genres' },
    { icon: WatchLaterIcon, label: 'Watch Later' },
];

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className={`fixed z-50 top-0 pt-[50px] left-0 h-screen bg-black/80 text-white transition-all duration-300 ease-in-out flex flex-col justify-between ml-6 ${open ? 'w-48' : 'w-14'}`}
        >
             <div className="flex flex-col">
                <div className="flex items-center gap-3 px-4 py-6">
                    {open? (<img
                        src={UserAvatar}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                    />) : ( <div className="bg-black w-10 h-10 rounded-full object-cover text-black">a</div> )}
                    <span
                        className={`text-sm font-medium text-white transition-all duration-300 ${
                            open ? 'opacity-100 ml-2' : 'opacity-0 ml-0 overflow-hidden'
                        }`}
                    >
            Daniel
          </span>
                </div>

                <div className="flex flex-col gap-6 px-3 mt-2">
                    {menuIcons.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 cursor-pointer hover:text-gray-500 transition-colors"
                        >
                            <img
                                src={item.icon}
                                alt={item.label}
                                className="w-6 h-6 shrink-0"
                            />
                            <span
                                className={`whitespace-nowrap text-sm transition-all duration-300 ${
                                    open ? 'opacity-100 w-auto ml-2' : 'opacity-0 w-0 overflow-hidden'
                                }`}
                            >
                {item.label}
              </span>
                        </div>
                    ))}
                </div>
            </div>

            {open && (  <div
                className="flex flex-col gap-2 px-3 pb-6 text-m transition-all duration-300"
            >
                <a href="#" className="text-white transition hover:text-gray-500">LANGUAGE</a>
                <a href="#" className="text-white transition hover:text-gray-500">GET HELP</a>
                <a href="#" className="text-white transition hover:text-gray-500">EXIT</a>
            </div>
                )}
        </div>
);
}

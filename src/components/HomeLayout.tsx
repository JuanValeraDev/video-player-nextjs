import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {useVideoData} from "@/hooks/useVideoData";
import {CardTitle} from "@/components/ui/card";
import VideoListItem from "@/components/VideoListItem";
import Link from "next/link";

export default function Home() {
    const {videos, handleVideoToPlay, handleIncrementLikes, handleIncrementWatches} = useVideoData();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
        setIsDarkMode(!isDarkMode);
    };

    return (
        <>
            <header className="bg-primary p-4 flex justify-between items-center">
                <Link href="/" onClick={()=>{
                    setSearchTerm("")
                }}>
                    <h1 className="text-2xl text-primary-foreground  font-bold ms-10">Video Player</h1>
                </Link>
                <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded text-secondary-foreground"
                />
                <Button onClick={toggleDarkMode}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
            </header>
            <div className="flex flex-col max-h-dvh p-0">
                <div className="sticky top-0 bg-background z-10 p-4 flex justify-between items-center flex-col">
                    <CardTitle className="text-2xl font-bold ">List of Videos</CardTitle>
                </div>
                <div className="overflow-y-auto p-4 grid gap-2 bg-secondary rounded-lg justify-items-center "
                     style={{gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'}}>
                    {filteredVideos.map((video) => (
                        <Link href={`/video-player?id=${video.id}`} key={video.id}>
                            <VideoListItem
                                key={video.id}
                                video={video}
                                onChangeVideoPlaying={() => handleVideoToPlay(video)}
                                onIncrementWatches={() => handleIncrementWatches(video.id)}
                                onIncrementLikes={() => handleIncrementLikes(video.id)}
                            />
                        </Link>
                    ))}
                </div>
            </div>
            <footer className="bg-primary text-primary-foreground p-4 text-center">
                <span className="text-l font-bold">Made with ❤️ by JuanValeraDev</span>
            </footer>
        </>
    );
}

"use client";

import { useRouter } from "next/navigation";
import PostComponent from "@/app/components/PostComponent";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from   "react";
import { Howl, Howler } from 'howler';
import useSWR from "swr";

const readingTime = require('reading-time');

interface DataType {
  data: {
    title: string;
    metaTitle: string;
    metaDesc: string;
    socialImage: string;
    date: string;
    hour: string;
    tags: string[];
    keywords: string[];
    italicWords: string[];
    linkPosts: string[];
    code: string[];
  };
  content: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Post() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<Howl | null>(null);
  const [savedMinute, setSavedMinute] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    audioRef.current = new Howl({
      src: `/music/lofi.mp3`,
      html5: true,
      onplay: () => {
        if (savedMinute !== null) {
          audioRef.current?.seek(savedMinute * 60);
          setElapsedTime(savedMinute * 60);
        }
      },
    });

    if (savedMinute !== null && !isPlaying) {
      audioRef.current?.seek(savedMinute * 60);
    }

    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    };

    const stopTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };

    startTimer();

    const handleBeforeUnload = () => {
      stopTimer();
      if (audioRef.current && isPlaying) {
        const currentTime = audioRef.current.seek();
        const currentMinute = Math.floor(currentTime / 60);
        localStorage.setItem("savedMinute", currentMinute.toString());
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        stopTimer();
      } else {
        startTimer();
      }
    };

    const handleClickLink = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("click", handleClickLink);

    // Recuperar o minuto salvo quando a página for montada
    const savedMinuteString = localStorage.getItem("savedMinute");
    if (savedMinuteString !== null) {
      const savedMinuteNumber = parseInt(savedMinuteString, 10);
      if (!isNaN(savedMinuteNumber)) {
        setSavedMinute(savedMinuteNumber);
      }
    }

    return () => {
      stopTimer();
      handleBeforeUnload();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("click", handleClickLink);

      // Limpar estado e parar a música ao desmontar o componente
      if (audioRef.current) {
        audioRef.current.stop();
        setIsPlaying(false);
      }
    };
  }, []);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes > 0 ? `${minutes} minutos ` : ''}${remainingSeconds} segundos`;
  };
  


  const router = usePathname();
  const regex = /\/post\/(\w+)/;
  
  const match = regex.exec(router);
  
  let slug;
  
  if (match && match[1]) {
    const result = match[1];
    slug = result;
  }
  
  const { data, error, isLoading } = useSWR<DataType[]>(
    `http://localhost:3000/api/posts?id=${slug}`,
    fetcher
    );
    
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    
    const highlightWords = (
      replacements: Record<string, string>,
      text: string
      ): string => {
        Object.entries(replacements).forEach(([pattern, replacement]) => {
      const regexPattern = new RegExp(pattern, "g");
      text = text.replace(regexPattern, replacement);
    });

    return text;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (!isPlaying && savedMinute !== null) {
        audioRef.current.seek(savedMinute * 60);
        setElapsedTime(savedMinute * 60);
      }
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-black text-white p-8 mb-8 rounded-md shadow-md">
      <Link
        href={"/"}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Home
      </Link>
      {data?.map((post) => {
        const content = highlightWords(
          {
            "\\*\\*(.*?)\\*\\*":
              '<span class="bg-yellow-200 text-black font-bold p-1 rounded">$1</span>',
            "\\*(.*?)\\*": '<span class="italic text-gray-400">$1</span>',
            "{(.*?)}":
              '<a href="$1" class="text-blue-500 hover:underline focus:outline-none focus:ring focus:border-blue-300">Matéria $1</a>',
            "--((.|\\s|\n)*?)--":
              '<pre class="bg-gray-800 text-white p-4 rounded font-mono whitespace-pre-wrap">$1</pre>',
          },
          post.content
        );

        const approximatedTime = readingTime(content).text.replace("read", "aproximadamente de leitura");

        if (post.data.socialImage.length > 0) {
          return (
            <PostComponent
              key={post.data.title}
              title={post.data.title}
              date={post.data.date}
              hour={post.data.hour}
              imgUrl={post.data.socialImage}
              content={content}
              tags={post.data.tags}
              approximatedTime={approximatedTime}
            />
          );
        }

        return (
          <PostComponent
            title={post.data.title}
            date={post.data.date}
            hour={post.data.hour}
            content={content}
            approximatedTime={approximatedTime}
          />
        );
      })}

      {/* Player de música */}
      <div className="fixed bottom-4 left-4 flex items-center space-x-2">
        {/* Botão de play/pause */}
        <button
          onClick={togglePlay}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        </div>

      <div className="fixed bottom-4 right-4 text-sm text-gray-500">
      {`Tempo na página: ${formatTime(elapsedTime)}`}
      </div>
    </div>
  );
}

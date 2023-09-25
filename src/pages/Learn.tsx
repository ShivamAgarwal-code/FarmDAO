import dynamic from "next/dynamic"
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import fetch from 'isomorphic-unfetch';

const Header = dynamic(() => import('./components/Header'), {
  ssr: false,
})

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
}

interface HomeProps {
  videos: Video[];
}

const apiKey = process.env.PUBLIC_YOUTUBE_API_KEY;
const maxResults = 60;

export default function Learn({ videos }: HomeProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredVideos = videos?.filter((video: Video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Farm-DAO/Learn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <input
          className={styles['search']}
          type="text"
          placeholder="Explore Green Living"
          value={searchTerm}
          onChange={handleSearch}
        />

        <div className={styles.grid}>
          {filteredVideos?.length === 0 ? (
            <p className="text-white text-xl">No result found</p>
          ) : (
            filteredVideos?.map((video: Video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                className={styles.card}
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className={styles.thumbnail}
                />
                <h2 className={styles.title}>{video.title}</h2>
              </a>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const playlistId = 'PL7Ine0vGWAijDlGc-nFoaCP3i5Jf_frqj';
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${apiKey}`
  );
  const data = await response.json();

  const videos = data.items?.map((item: any) => ({
    id: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    thumbnailUrl: item.snippet.thumbnails.medium.url,
  }));

  return { props: { videos } };
}
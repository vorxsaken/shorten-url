import { charm } from '@/utils';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const generateUrl = async () => {
    setIsLoading(true);
    if (url.length < 1) return;

    try {
      const getGeneratedUrl = await fetch('https://srt-delta.vercel.app/api/generateUrl', {
        method: "POST",
        body: JSON.stringify({
          user: session?.user?.email ?? '',
          url: url
        })
      })

      const generatedUrl = await getGeneratedUrl.json();

      if (getGeneratedUrl.status == 200) {
        return router.push(`/sortedLink/${generatedUrl.id}`);
      }

      throw new Error(generatedUrl.message);

    } catch (err) {
      setIsLoading(false);
      window.alert(err);
    }
  }

  return (
    <Layout>
      <article className='main'>
        <div className={`header ${charm.className}`}>
          <p className='title'>Shorten</p>
          <p className='subtitle'>shorten your url</p>
        </div>
        <div className='body'>
          <input
            id='urlText'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            placeholder='input your url ...' />
          <Button loading={isLoading} onClick={() => generateUrl()}>Generate</Button>
        </div>
      </article>
    </Layout>
  )
}

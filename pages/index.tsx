import { charm } from '@/utils';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Home() {
  const [url, setUrl] = useState('')
  const router = useRouter();
  const { data: session, status} = useSession();
  
  const generateUrl = async () => {
    if (url.length < 1) return;

    try {
      const getGeneratedUrl = await fetch('http://localhost:3000/api/generateUrl', {
        method: "POST",
        body: JSON.stringify({
          user: session?.user?.email ?? '',
          url: url
        })
      })

      const generatedUrl = await getGeneratedUrl.json();

      if(getGeneratedUrl.status == 200){
        return router.push(`/sortedLink/${generatedUrl.id}`);
      } 
      
      throw new Error(generatedUrl.message);

    } catch (err) {
      window.alert(err);
    }
  }

  return (
    <Layout>
      <div className='main'>
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
          <Button onClick={() => generateUrl()}>Generate</Button>
        </div>
      </div>
    </Layout>
  )
}

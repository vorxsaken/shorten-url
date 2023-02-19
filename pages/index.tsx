import { charm } from '@/utils';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import { useState } from 'react';
import Link, { useRouter } from 'next/router';

export default function Home() {
  const [url, setUrl] = useState('')
  const router = useRouter();

  const generateUrl = () => {
    fetch('http://localhost:3000/api/generateUrl', {
      method: "POST",
      body: JSON.stringify({
        user: '',
        url: url
      })
    })
      .then((res) => res.json())
      .then((json) => {
        router.push({
          pathname: '/sortedLink/[id]',
          query: { id: json._id }
        })
      })
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

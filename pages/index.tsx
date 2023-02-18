import { Charm } from '@next/font/google'
import Layout from '@/components/Layout';
import Button from '@/components/Button';

const charm = Charm({ weight: "400", subsets: ['latin'] });

export default function Home() {
  return (
    <Layout>
      <div className='main'>
        <div className={`header ${charm.className}`}>
          <p className='title'>Shorten</p>
          <span className='subtitle'>shorten your url</span>
        </div>
        <div className='body'>
          <input type="text" placeholder='input your url ...' />
          <Button>Generate</Button>
        </div>
      </div>
    </Layout>
  )
}

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Layout,{siteTitle} from '../components/Layout';
import Link from 'next/Link';
import utilstyles from "../styles/utiles.module.css";
import {getPostsData} from "../lib/post"

//SSGの場合
export async function getStaticProps(){
  const allPostsData = getPostsData(); //id,title,date,thumbnail
  console.log(allPostsData);

  return{
    props:{
      allPostsData,
    }
  }
}

//SSRの場合

export default function Home( {allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilstyles.headingMd}>
        <p>
          私は三重県の田舎で暮らしている会社員です/独学でWeb制作や業務改善のプログラムの勉強をしています。
        </p>
        <h2>📝エンジニアのブログ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({id,title,date,thumbnail})=>(
          <article key={id}>
            <Link href={`/posts/${id}`}>
              <img src={`${thumbnail}`} 
              className={styles.thumbnailImage}
              alt="" />
            </Link>
            <Link href={`/posts/${id}`}>
              <a className={utilstyles.boldText} >{title}</a>
            </Link>
            <br />
            <small className={utilstyles.lightText}>{date}</small>
          </article>

        ))}
      </div>
      </section>
    </Layout>
  )
}

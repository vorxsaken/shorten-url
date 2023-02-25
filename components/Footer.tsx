import styles from "./Footer.module.css"
import { AiFillGithub, AiFillInstagram } from 'react-icons/ai'

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.icons}>
          <a href="https://github.com/vorxsaken"
            target="_blank"
            rel="noopener noreferrer">
            <AiFillGithub />
          </a>
          <a
            href="https://www.instagram.com/vorxsaken/"
            target="_blank"
            rel="noopener noreferrer">
            <AiFillInstagram />
          </a>
        </div>
        <div className={styles.content}>
          <p>
            Fueled by NextJS. Source code available in &nbsp;
            <a
              href="https://github.com/vorxsaken/shorten-url"
              target="_blank"
              rel="noopener noreferrer">
              github
            </a>
          </p>
        </div>
        <span className={styles.ikan}>Vorxsaken &#169; 2023</span>
      </div>
    </div>
  )
}

import React from 'react'
import styles from "./page.module.css";
import Image from 'next/image';

const BlogPost = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>
            Lorem ipsum dolor sit amet consectetur, adipisicing
          </h1>
          <p className={styles.desc}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Repellendus quia animi officiis laudantium ut excepturi,
            esse temporibus magnam voluptate placeat reprehenderit dolorum
          </p>
          <div className={styles.author}>
            <Image
              src={'https://images.pexels.com/photos/17959888/pexels-photo-17959888/free-photo-of-glacier-iceland-snow-wood.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>LetInfo</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={'https://images.pexels.com/photos/17959888/pexels-photo-17959888/free-photo-of-glacier-iceland-snow-wood.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nulla
          maxime quisquam distinctio neque commodi autem iure amet. Nulla, eos.
          Reprehenderit quia eaque perspiciatis odio architecto laudantium ipsam
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nulla
          maxime quisquam distinctio neque commodi autem iure amet. Nulla, eos.
          Reprehenderit quia eaque perspiciatis odio architecto laudantium ipsam
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nulla
          maxime quisquam distinctio neque commodi autem iure amet. Nulla, eos.
          Reprehenderit quia eaque perspiciatis odio architecto laudantium ipsam
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nulla
          maxime quisquam distinctio neque commodi autem iure amet. Nulla, eos.
          Reprehenderit quia eaque perspiciatis odio architecto laudantium ipsam
          nostrum. Illo.
        </p>
        <br />
        <br />
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nulla
          maxime quisquam distinctio neque commodi autem iure amet. Nulla, eos.
          Reprehenderit quia eaque perspiciatis odio architecto laudantium ipsam
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nulla
          maxime quisquam distinctio neque commodi autem iure amet. Nulla, eos.
          Reprehenderit quia eaque perspiciatis odio architecto laudantium ipsam
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nulla
          maxime quisquam distinctio neque commodi autem iure amet. Nulla, eos.
          Reprehenderit quia eaque perspiciatis odio architecto laudantium ipsam
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam nulla
          maxime quisquam distinctio neque commodi autem iure amet. Nulla, eos.
          Reprehenderit quia eaque perspiciatis odio architecto laudantium ipsam
          nostrum. Illo.
        </p>
      </div>
    </div>
  )
}

export default BlogPost
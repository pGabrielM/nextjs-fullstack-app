export const runtime = "edge";

import React from 'react'
import styles from "./page.module.css";
import Image from 'next/image';
import { IPost } from '@/models/Post';
import { notFound } from 'next/navigation'

async function getData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/posts/${id}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw notFound();
  }

  return res.json();
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const post = await getData(params.id)

  return {
    title: post.title,
    description: post.desc
  }
}

const BlogPost = async ({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const data: IPost = await getData(params.id);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>{data.desc}</p>
          <div className={styles.author}>
            <Image
              src={data.img}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={data.img}
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{data.content}</p>
      </div>
    </div>
  )
}

export default BlogPost
"use client";

import React from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR, { Fetcher } from "swr";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

interface IPost {
  _id: string
  title: string;
  desc: string;
  img: string;
  content: string
  username: string
}

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const { register, handleSubmit } = useForm<IPost>()

  const fetcher: Fetcher<IPost[], string> = (...args) =>
    fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR<IPost[]>(
    `api/posts?username=${session.data?.user?.name}`,
    fetcher
  );

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router.push("/dashboard/login");
  }

  const onSubmit: SubmitHandler<IPost> = (data: IPost) => {

    const title = data.title
    const desc = data.desc
    const image = data.img

    console.log(desc)


  }

  if (session.status === "authenticated") {
    return <div className={styles.container}>
      <div className={styles.posts}>
        {data?.map((post: IPost) => (
          <div className={styles.post} key={post._id}>
            <div className={styles.imgContainer}>
              <Image src={post.img} alt="" />
            </div>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <span className={styles.delete}>X</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input {...register("title", {})} />
        <input {...register("desc")} />
        <textarea {...register("img")} placeholder="Content" className={styles.textArea} cols={30} rows={10} />
        <h1>Add new Post</h1>

        <button className={styles.button} type='submit'>Send</button>
      </form>
    </div >;
  }
};

export default Dashboard;

"use client";

import React from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR, { Fetcher } from "swr";
import Image from "next/image";
import { IPost } from "@/models/Post";
import { SubmitHandler, useForm } from "react-hook-form";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const { register, handleSubmit } = useForm<IPost>();

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

  const onSubmit: SubmitHandler<IPost> = async (data) => {

    const title = data.title
    const desc = data.desc
    const image = data.img


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
        <h1>Add new Post</h1>
        <input
          {...register("title")} type="text"
          placeholder="Title"
          required
          className={styles.input}
        />
        <input
          {...register("desc")}
          placeholder="Description"
          required
          className={styles.input}
        />
        <input
          {...register("image")}
          placeholder="Image"
          required
          className={styles.input}
        />
        <textarea />

        <textarea placeholder="Content" className={styles.textArea} cols={30} rows={10} />
        <button className={styles.button} type='submit'>Send</button>
      </form>
    </div >;
  }
};

export default Dashboard;

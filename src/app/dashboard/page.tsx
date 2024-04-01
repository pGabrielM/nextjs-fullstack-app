"use client";

import React, { use } from "react";
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
  const { reset, register, handleSubmit, formState: { errors } } = useForm<IPost>()

  const fetcher: Fetcher<IPost[], string> = (...args) =>
    fetch(...args).then((res) => res.json());

  const { data, error, isLoading, mutate } = useSWR<IPost[]>(
    `api/posts?username=${session.data?.user?.name}`,
    fetcher
  );

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router.push("/dashboard/login");
  }

  const onSubmit: SubmitHandler<IPost> = async (data: IPost) => {

    const title = data.title
    const desc = data.desc
    const img = data.img
    const content = data.content

    try {
      await fetch("api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data?.user?.name
        })
      })
      mutate();
      reset();

    } catch (err) {
      console.log(err)
    }

  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`api/posts/${id}`, {
        method: "DELETE"
      });
      mutate();
    } catch (error) {

    }
  }

  if (session.status === "authenticated") {
    return <div className={styles.container}>
      <div className={styles.posts}>
        {isLoading ? "loading" : data?.map((post: IPost) => (
          <div className={styles.post} key={post._id}>
            <div className={styles.imgContainer}>
              <Image src={post.img} alt="" width={200} height={100} />
            </div>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <span className={styles.delete} onClick={() => handleDelete(post._id)}>X</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.new}>
        <h1>Add new Post</h1>
        <input
          {...register("title", {
            required: { value: true, message: 'Title is required' }
          })}
          placeholder="Title"
          className={styles.input}
        />
        {errors.title && <span className={styles.validationMessage}>{errors.title.message}</span>}
        <input
          {...register("desc", { required: { value: true, message: 'Description is required' } })}
          placeholder="Desc"
          className={styles.input}
        />
        {errors.desc && <span className={styles.validationMessage}>{errors.desc.message}</span>}
        <input
          {...register("img", {
            required: { value: true, message: 'Url is required' },
            pattern: {
              value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi,
              message: 'Please enter a valid url'
            }
          })}
          placeholder="Image"
          className={styles.input}
        />
        {errors.img && <span className={styles.validationMessage}>{errors.img.message}</span>}
        <textarea
          {...register("content", { required: { value: true, message: 'Content is required' } })}
          placeholder="Content"
          className={styles.textArea}
          cols={30}
          rows={10}
        />
        {errors.content && <span className={styles.validationMessage}>{errors.content.message}</span>}
        <button className={styles.button} type='submit'>Send</button>
      </form>
    </div >;
  }
};

export default Dashboard;

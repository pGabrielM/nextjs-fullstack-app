"use client"

import { signIn, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type IPost = {
  name: string;
  email: string;
  password: string;
};

const Login = () => {
  const session = useSession()
  const router = useRouter()
  const { register, handleSubmit } = useForm<IPost>();


  if (session.status === "loading") {
    return <p>Loading...</p>
  }

  if (session.status === "authenticated") {
    router.push("/dashboard")
  }

  const onSubmit: SubmitHandler<IPost> = async (data) => {

    const name = data.name
    const email = data.email
    const password = data.password

    signIn("credentials", { email, password })
  }

  return (
    <div>
      <div>
        <div className={styles.container}>
          <h1 className={styles.subtitle}>Please sign in to see the dashboard.</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
              {...register("email")}
              type="text"
              placeholder="Email"
              required
              className={styles.input}
            />
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              required
              className={styles.input}
            />
            <button className={styles.button} type='submit'>Login</button>
          </form>
          <p>OR</p>
          <button onClick={() => signIn("google")}>Login with Google</button>
        </div>
      </div>
    </div>
  )
}

export default Login
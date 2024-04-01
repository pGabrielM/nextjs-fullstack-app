"use client"

import { signIn, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';

type LoginInput = {
  name: string;
  email: string;
  password: string;
};

const Login = ({ searchParams }: any) => {
  const session = useSession()
  const router = useRouter()
  const { register, handleSubmit } = useForm<LoginInput>();
  const [errorMessage, setErrorMessage] = useState<string>();


  if (session.status === "loading") {
    return <p>Loading...</p>
  }

  if (session.status === "authenticated") {
    router.push("/dashboard")
  }

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (result?.error) {
      setErrorMessage(result?.error)
    }
  }

  return (
    <div>
      <div>
        <div className={styles.container}>
          <span className={styles.accountCreatedMessage}>{searchParams.success}</span>
          <h1 className={styles.subtitle}>Please sign in to see the dashboard.</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
              {...register("email")}
              type="email"
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
            <h4 className={styles.errorMessage}>{errorMessage}</h4>
            <button className={styles.button} type='submit'>Login</button>
          </form>
          <p>OR</p>
          <button className={styles.loginWithGoogleBtn} onClick={() => signIn("google")}>Login with Google</button>
          <p>OR</p>
          <Link className={styles.link} href="/dashboard/register">
            Create new account
          </Link>
        </div>
      </div>
    </div >
  )
}

export default Login
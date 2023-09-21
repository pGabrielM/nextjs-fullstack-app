"use client"

import React, { useState } from 'react'
import styles from "./page.module.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import bcrypt from "bcryptjs"

type FormValues = {
  name: string;
  email: string;
  password: string;
};





const Register = () => {
  const [error, setError] = useState(false);
  const router = useRouter()

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {

    const name = data.name
    const email = data.email
    const password = data.password

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })

      res.status === 201 && router.push("/dashboard/login?success=Account has been created")

    } catch {
      setError(true)
    }
  }

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>Create an Account</h1>
        <h2 className={styles.subtitle}>Please sign up to see the dashboard.</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            {...register("name")}
            type="text"
            placeholder="name"
            required
            className={styles.input}
          />
          <input
            {...register("email")} type="text"
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
          <button className={styles.button} type='submit'>Register</button>
          {error && "Something went wrong!"}
        </form>
        <span className={styles.or}>- OR -</span>
        <Link className={styles.link} href="/dashboard/login">
          Login with an existing account
        </Link>
      </div>
    </div>
  )
}

export default Register
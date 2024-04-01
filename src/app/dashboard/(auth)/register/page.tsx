"use client"

import React, { useState } from 'react'
import styles from "./page.module.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [error, setError] = useState(false);
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const name = data.name
    const email = data.email
    const password = data.password

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

    if (!res.ok) {
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
            {...register("name", {
              required: { value: true, message: 'Name is required' }
            })}
            type="text"
            placeholder="Name"
            className={styles.input}
          />
          {errors.name && <span className={styles.validationMessage}>{errors.name.message}</span>}
          <input
            {...register("email", {
              required: { value: true, message: 'Email is required' }
            })}
            type="email"
            placeholder="Email"
            className={styles.input}
          />
          {errors.email && <span className={styles.validationMessage}>{errors.email.message}</span>}
          <input
            {...register("password", {
              required: { value: true, message: 'Password is required' }
            })}
            type="password"
            placeholder="Password"
            className={styles.input}
          />
          {errors.password && <span className={styles.validationMessage}>{errors.password.message}</span>}
          <button className={styles.button} type='submit'>Register</button>
          {error && <span className={styles.validationMessage}>Something went wrong!</span>}
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
"use client"

import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'
import DarkModeTogle from '../DarkModeToggle/DarkModeTogle';
import { signIn, signOut, useSession } from 'next-auth/react';

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

export const Navbar = () => {
  const session = useSession()

  return (
    <div className={styles.container}>
      <Link href={'/'} className={styles.logo}>
        Letinfo
      </Link>
      <div className={styles.links}>
        <DarkModeTogle />
        {links.map((link, key) => (
          <Link className={styles.link} href={link.url} key={key}>{link.title}</Link>
        ))}
        {session.status == 'authenticated' &&
          <button className={styles.logout} onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>
        }
      </div>
    </div>
  )
}
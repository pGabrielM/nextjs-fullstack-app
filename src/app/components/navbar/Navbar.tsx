"use client"
import Link from 'next/link'
import React from 'react'

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
  return (
    <div>
      {links.map((link, key) => (
        <Link href={link.url} key={key}>{link.title}</Link>  
      ))}
      <button onClick={() => console.log('loggout')}>logout</button>
    </div>
  )
}
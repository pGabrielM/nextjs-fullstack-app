"use client"

import React from 'react'
import styles from './page.module.css'
import { useSession } from 'next-auth/react'


const Dashboard = () => {
  const session = useSession()

  console.log(session)

  return (
    <div className={styles.container}>Dashboard</div>
  )
}

export default Dashboard
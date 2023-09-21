import React from 'react'
import styles from './page.module.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LetInfo - Dashboard',
  description: 'Dashboard page',
}

const Dashboard = () => {
  return (
    <div className={styles.container}>Dashboard</div>
  )
}

export default Dashboard
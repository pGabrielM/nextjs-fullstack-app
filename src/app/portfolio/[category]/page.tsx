import React from 'react'
import styles from './page.module.css'
import { Button } from '@/components/Button/Button'
import Image from 'next/image'

interface CategoryType {
  params: {
    category: string
  }
}

export const Category = ({ params }: CategoryType) => {
  console.log(params)
  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{params.category}</h1>
      <div className={styles.item}>
        <div className={styles.content}>
          <h1 className={styles.title}>Test</h1>
          <p className={styles.desc}>Desc</p>
          <Button url='#' text='See More' />
        </div>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            fill={true}
            src={'https://images.pexels.com/photos/17959888/pexels-photo-17959888/free-photo-of-glacier-iceland-snow-wood.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
            alt='' />
        </div>
      </div>
    </div>
  )
}

export default Category

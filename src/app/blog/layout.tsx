import React, { ReactNode } from 'react'

type BlogProps = {
  children: ReactNode
}

export const BlogLayout = ({children}: BlogProps) => {
  return (
    <div>
      <h1>This is blog</h1>
      {children}
    </div>
  )
}

export default BlogLayout

import React from 'react'
import { categories } from '../constants.ts'

async function Homepage() {

  const news: NewsResponse = await fetchNews(categories.join(','))

  return (
    <div>
      {/* NewsList news */}
    </div>
  )
}

export default Homepage
import { categories } from '../constants'
import fetchNews from '../lib/fetchNews'

async function Homepage() {

  const news: NewsResponse = await fetchNews(categories.join(','))

  console.log(news);

  return (
    <div>
      {/* NewsList news */}
    </div>
  )
}

export default Homepage
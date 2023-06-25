import { gql } from "graphql-request"
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {

  //GraphQL Query.
  const query = gql`
  query MyQuery (
    $access_key: String!
    $categories: String!
    $keywords: String
  ){
    typicodeQuery(
      access_key: $access_key
      categories: $categories
      countries: "gb"
      sort: "published_desc"
      keywords: $keywords
    ) {
    data {
        description
        country
        category
        author
        image
        language
        published_at
        source
        title
        url
      }
      pagination {
        count
        limit
        offset
        total

      }
    }
  }`

  //Fetch function with Next.js 13 caching.
  const res = await fetch('https://tahannawt.stepzen.net/api/joao-endpoint/__graphql',
    {
      method: 'POST',
      cache: isDynamic ? 'no-cache' : "default",
      next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: query,
        variables: {
          access_key: process.env.MEDIASTACK_API_KEY,
          categories: category,
          keywords: keywords,
        }
      })
    });

  // console.log(
  //   "LOADING NEW DATA FORM API for category >>>>",
  //   category,
  //   keywords
  // )

  const newsResponse = await res.json();
  //Sort function by images vs not images present.
  const news = sortNewsByImage(newsResponse.data.myQuery);

  return news;

}

export default fetchNews;

// stepzen import curl "http://api.mediastack.com/v1/news?access_key=dfe76a1ce79ff084d7730fcc8a0b270c"  
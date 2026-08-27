import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { FetchBlogData, type SubBlogData } from "../utils/BlogFetching";

export default function SubBlog() {
  const { subBlogPath } = useParams();
  const [subBlogData, setSubBlogData] = useState<undefined | SubBlogData>();

  useEffect(() => {
    if (subBlogPath) {
      FetchBlogData(subBlogPath, setSubBlogData)
      .then(json => {
        document.title = `Posts - ${json?.title}`
      })
    }
  }, [])

  if (subBlogData) {
    return (
      <>
        <h1>{subBlogData.title}</h1>
        <ul>
          {subBlogData.posts.map((post, index) => <li key={index}><Link to={post.path}>{post.name}</Link></li>)}
        </ul>
      </>
    )
  }
  else {
    return (<p>blog not found</p>);
  }
}
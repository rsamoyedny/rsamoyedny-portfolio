import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { FetchBlogData, type SubBlogData } from "../utils/BlogFetching";
import Markdown from 'markdown-to-jsx/react'

export default function BlogPost() {
  const { subBlogPath, postPath } = useParams();
  const [subBlogData, setSubBlogData] = useState<undefined | SubBlogData>();
  const [postIndex, setPostIndex] = useState(-1);
  const [post, setPost] = useState("post not found");

  useEffect(() => {
    if (subBlogPath) {
      FetchBlogData(subBlogPath, setSubBlogData)
    }
  }, [])

  useEffect(() => {
    if (subBlogData) {
      setPostIndex(subBlogData.posts.findIndex(post => post.path === postPath));
    }
  }, [subBlogData])

  useEffect(() => {
    if (subBlogData && postIndex >= 0) {
      document.title = `${subBlogData.posts[postIndex].name} - ${subBlogData.title}`;
      fetch(`/blogs/${subBlogPath}/${subBlogData.posts[postIndex].file}`)
        .then(result => result.text())
        .then(text => setPost(text))
        .catch(e => console.log(e))
    }
  }, [postIndex])

  if (subBlogData && post) {
    return (
      <>
        <nav>
          <ul>
            {
              postIndex - 1 >= 0
                ? <li><Link to={`../${subBlogData.posts[postIndex - 1].path}`} reloadDocument>To Previous Post</Link></li>
                : <li><span>No Prevoius Posts</span></li>
            }
            <li><Link to="..">Back to Posts</Link></li>
            {
              postIndex + 1 < subBlogData.posts.length
                ? <li><Link to={`../${subBlogData.posts[postIndex + 1].path}`} reloadDocument>To Next Post</Link></li>
                : <li><span>No Prevoius Posts</span></li>
            }
          </ul>
        </nav>
        <article>
          <Markdown>
            {post}
          </Markdown>
        </article>
      </>
    )
  }
  else {
    return (<p>post not found</p>);
  }
}
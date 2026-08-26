export type SubBlogData = {
  title: string,
  posts: {
    name: string,
    path: string,
    file: string
  }[]
}

export const FetchSubBlogData = (path: string, setPostsData: React.Dispatch<React.SetStateAction<SubBlogData | undefined>>) => {
  return fetch(`/blogs/${path}/subBlogData.json`)
    .then(result => result.json())
    .then(json => {setPostsData(json); return json;})
    .catch(e => console.log(e))
}
import { usePostContext } from '../contexts/PostContext'
import Post from './Post'
import Main from './Main'
import '../css/Posts.css'

const Posts = () => {
  const { posts, isLoading, error } = usePostContext()

  return (
    <>
      {error && <div className='error-message'>{error}</div>}
      {isLoading ? (
        <div className='loading'>Загрузка...</div>
      ) : (
        <div>
          <Main post={posts[0]} />
          <section className='posts'>
            <div className='container'>
              <div className='posts__grid'>
                {posts.slice(1).map(post => (
                  <Post post={post} key={post.id} />
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  )
}
export default Posts

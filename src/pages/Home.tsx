import { useState, useEffect } from 'react'
import { searchPost, getPosts } from '../services/api'
import '../css/Home.css'
import Header from '../components/Header'
import Main from '../components/Main'
import Post from '../components/Post'
import { PostType } from '../types/post'
import Posts from '../components/Posts'

const Home = () => {
  const [error, setError] = useState('')
  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState(true)
  // const { isFavorite, addToFavorites, removeFromFavorites } = usePostContext()
  // const favorite = isFavorite(movie.id)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await getPosts()
        setPosts(posts)
      } catch (err) {
        console.log(err)
        setError('Не получилось загрузить посты...')
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  return (
    <div>
      <Header />
      {error && <div className='error-message'>{error}</div>}

      {loading ? (
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
    </div>
  )
}
export default Home

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { searchPost, getPosts } from '../services/api'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [games, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const loadPosts = async () => {
  //     try {
  //       const posts = await getPosts()
  //       setPosts(posts)
  //     } catch (err) {
  //       console.log(err)
  //       setError('Не получилось загрузить игрули...')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   loadPosts()
  // }, [])

  return (
    <div>
      <Link to='/post'>Посты</Link>
    </div>
  )
}
export default Home

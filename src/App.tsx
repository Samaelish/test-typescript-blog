import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import CurrentPost from './pages/CurrentPost.tsx'
import { PostProvider } from './contexts/PostContext.tsx'
import Post from './components/Post.tsx'

function App() {
  return (
    <PostProvider>
      <Routes>
        <Route path='/dsfds' element={<Home />} />
        <Route path='/' element={<CurrentPost />} />
      </Routes>
    </PostProvider>
  )
}

export default App

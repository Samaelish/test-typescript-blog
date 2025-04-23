import { PostProvider } from './contexts/PostContext.tsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import PostDetail from './pages/PostDetail.tsx'

function App() {
  return (
    <PostProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post/:id' element={<PostDetail />} />
      </Routes>
    </PostProvider>
  )
}

export default App

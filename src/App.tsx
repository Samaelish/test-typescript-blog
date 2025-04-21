import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Post from './pages/Post.tsx'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/post' element={<Post />} />
    </Routes>
  )
}

export default App

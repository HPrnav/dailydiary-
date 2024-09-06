import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blogs } from './pages/Blogs'
import { Blog } from './pages/Blog'
import { Publish } from './pages/Publish'
import { Landing } from './pages/Landing'
import {My_blogs} from './pages/My_blogs'
import { SavedBlogs } from './pages/Saved_blog'
  
 function App() {
 
  return (
    <>
     
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs  />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/My_blogs" element={<My_blogs/>} />
          <Route path="/Saved_blog" element={<SavedBlogs/>} />
        </Routes>
       </BrowserRouter>
      

      <></>
    </>
  )
}

export default App
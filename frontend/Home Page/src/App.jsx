
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Programs from './components/Programs'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className="container">
      <Programs/>
      </div>
      
    </div>
  )
}

export default App

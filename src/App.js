import { useState, useRef } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import './App.css'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'

const App = () => {
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='

  // useEffect(() => {
  //   if (search) {
  //     const fetchData = async () => {
  //       document.title = `Search results for ${search} music`
  //       setMessage(`Search results for ${search}`)
  //       const response = await fetch(API_URL + search)
  //       const resData = await response.json()
  //       if (resData.results.length > 0) {
  //         return setData(resData.results)
  //       } else {
  //         return setMessage('No Results found.')
  //       }
  //     }
  //     fetchData()
  //   }
  // }, [search])

  const handleSearch = (e, term) => {
    e.preventDefault()
    //Fetch the data 
    const fetchData = async () => {
      document.title = `Search results for ${term} music`
      setMessage(`Search results for ${term}`)
      const response = await fetch(API_URL + term)
      const resData = await response.json()
      if (resData.results.length > 0) {
        return setData(resData.results)
      } else {
        return setMessage('No Results found.')
      }
    }
    fetchData()
  }

  return (
    <div>
      <h1>{message}</h1>
      <SearchContext.Provider value={{
        term: searchInput,
        handleSearch: handleSearch
      }}>
        <SearchBar />
      </SearchContext.Provider>

      <DataContext.Provider value={data}>
        <Gallery />
      </DataContext.Provider>
    </div>
  )
}

export default App

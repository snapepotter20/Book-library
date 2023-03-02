import SearchBar from './SearchBar'
import Snippet from './Snippet'
import React , { useState, useEffect } from 'react'
// import Pagination from './Pagination';
import Searchbar from './LeftMenu';

function App() {
    // Search Input Value
    const [search, setSearch] = useState('')
    const [books, setBooks] = useState([])

    // Pagination
    const [visible, setVisible] = useState(5);
    const loadMoreBooks = () => {
        setVisible((prevValue) => prevValue + 5)
    }
    // Pagination button
    const loadMoreButton = document.getElementById('load-more-button')

    // fetch
    const apiUrl = `https://openlibrary.org/search.json?q=${search}`

    useEffect(() => {
        let controller = new AbortController()

        async function fetchApi() {
            try {
                const response = await fetch(apiUrl, {
                    signal: controller.signal,
                })
                const data = await response.json()
                setBooks(data.docs)
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('fetch cancel: caught abort')
                } else {
                    throw error
                }
            }
        }

        fetchApi()
        if (loadMoreButton) {
            loadMoreButton.style.display = 'block'
        }



        return ()=>{
            controller.abort()
        }
    }, [search])

    return (
        <>
        
        <div className="App" >
            <>
            <SearchBar
                onChange={(inputValue) => {
                    setSearch(inputValue)
                }}
            />

            {books.slice(0, visible).map((book) => {
                return (
                    <Snippet
                        key={book.key}
                        title={book.title ? book.title : 'unknown'}
                        author={
                            book.author_name ? book.author_name[0] : 'unknown'
                        }
                        firstPublished={
                            book.first_publish_year
                                ? book.first_publish_year
                                : 'unknown'
                        }
                        publisher={
                            book.publisher ? book.publisher[0] : 'unknown'
                        }
                        isbn={book.isbn ? book.isbn[0] : 'unknown'}
                        cover={
                            book.isbn
                                ? 'http://covers.openlibrary.org/b/isbn/' +
                                book.isbn[0] +
                                '-M.jpg'
                                : ''
                        }
                    />
                )
            })}
            <button
                className="load-more-button"
                id="load-more-button"
                onClick={loadMoreBooks}
            >
                Load more books
            </button>
            </>
        </div>
        
        
        <div >
            <Searchbar/>
        </div>
        
        </>
    )
}

export default App;



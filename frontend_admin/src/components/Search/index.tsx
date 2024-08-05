import React from 'react'
import styles from './search.module.scss'

interface SearchInputProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const Search: React.FC<SearchInputProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <input
      className={styles.input}
      type="search"
      placeholder="Поиск"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  )
}

export default Search

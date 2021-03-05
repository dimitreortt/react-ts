import React, { useState } from 'react'
import { useActions } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypedSelector'

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('')
  const { searchRepositories } = useActions()
  // const state = useSelector((state: any) => state.repositories)
  const { data, loading, error } = useTypedSelector(
    (state) => state.repositories
  )

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    searchRepositories(term)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <div>{error}</div>}
      {loading && <div>{loading}</div>}
      {data && data.map((name) => <h3>{name}</h3>)}
    </div>
  )
}

export default RepositoriesList

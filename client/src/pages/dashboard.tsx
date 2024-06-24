import { useEffect } from 'react'

export function Dashboard() {
  useEffect(() => {
    fetch('http://localhost:3000/users', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then(console.log)
  }, [])

  return (
    <>
      <h1>Dashboard</h1>
    </>
  )
}

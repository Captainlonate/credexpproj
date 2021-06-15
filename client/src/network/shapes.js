export const getAllShapes = async () => {
  let results = { data: null, error: null }

  try {
    const serverResponse = await fetch(`${process.env.REACT_APP_API_URL}/shapes`)
    results.data = await serverResponse.json()
  } catch (ex) {
    console.log('Could not fetch shapes', ex.message)
    results.error = ex.message
  }

  return results
}
export const getAllColors = async () => {
  let results = { data: null, error: null }

  try {
    const serverResponse = await fetch(`${process.env.REACT_APP_API_URL}/colors`)
    results.data = await serverResponse.json()
  } catch (ex) {
    console.log('Could not fetch colors', ex.message)
    results.error = ex.message
  }

  return results
}
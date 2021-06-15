// A generic function used to build specialized findBy<Key> functions
// Example:
//  const findByLabel = findBy('label') 
//  findByLabel('nate', [{ label: 'nate' }, { label: 'heather' }])
export const findBy = (key) => (needle, haystack) => (
  Array.isArray(haystack)
    ? haystack.find((item) => needle === item[key])
    : undefined
)
export const findByLabel = findBy('label')
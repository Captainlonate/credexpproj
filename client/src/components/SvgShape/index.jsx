const SvgShape = ({ color, paths }) => (
  <svg style={{ fill: color }} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    {
      paths.map((p, idx) => (<path key={idx} d={p}></path>))
    }
  </svg>
)

export default SvgShape

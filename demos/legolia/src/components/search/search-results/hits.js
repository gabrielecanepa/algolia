const Hits = ({ hits, ...props }) => (
  <div {...props}>
    {hits.map(hit => (
      <div key={hit.objectID}>{hit.name}</div>
    ))}
  </div>
)

export default Hits

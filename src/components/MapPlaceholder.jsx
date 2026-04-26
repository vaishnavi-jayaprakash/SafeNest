function MapPlaceholder({ large = false, leftTag, rightTag }) {
  return (
    <div className={`map-placeholder ${large ? 'large' : ''}`}>
      <span className="tag safe">{leftTag}</span>
      <span className="tag alert">{rightTag}</span>
    </div>
  )
}

export default MapPlaceholder

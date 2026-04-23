import ImageCarousel from './ImageCarousel'

function PlantCard({ plant }) {
  const { name, images, description, care, pests, difficulty } = plant

  return (
    <div className="plant-card">
      <ImageCarousel images={images} alt={name} />
      
      <div className="info-section">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">{name}</h2>
          <span className={`badge ${
            difficulty === 'Легко' ? 'bg-success' : 
            difficulty === 'Средне' ? 'bg-warning text-dark' : 'bg-danger'
          }`}>
            {difficulty}
          </span>
        </div>
        
        <div className="mb-4">
          <h3>🌱 Описание</h3>
          <p className="lead">{description}</p>
        </div>

        <div className="mb-4">
          <h3>💧 Уход</h3>
          <ul>
            {care.map((item, index) => (
              <li key={`${name}-care-${index}`}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>🐛 Вредители и болезни</h3>
          <ul className="pest-list">
            {pests.map((item, index) => (
              <li key={`${name}-pest-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PlantCard

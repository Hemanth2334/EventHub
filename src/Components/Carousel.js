import React from 'react';

export default function Carousel({ items }) {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id="carousel">
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <div key={item._id || index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <div className="carousel-image-container">
                  <div className="carousel-overlay"></div>
                  <img 
                    src={item.img} 
                    className="d-block w-100" 
                    alt={item.name} 
                  />
                </div>
                <div className="carousel-caption d-none d-md-block">
                  <h5>{item.name}</h5>
                </div>
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <img src="https://placehold.co/900x500?text=Loading+Events..." className="d-block w-100" alt="Loading..." />
            </div>
          )}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
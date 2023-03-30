import React, { useState } from 'react';
import { API } from 'aws-amplify';
import awsconfig from '../aws-exports';
import './yelp.css';

function Yelp() {
  const [formState, setFormState] = useState({
    restaurant: '',
    description: '',
    city: ''
  });

  const [restaurants, setRestaurants] = useState([]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: formState.restaurant,
      description: formState.description,
      city: formState.city
    };
    console.log(data); // Log the form input data as an object to the console
    setRestaurants([...restaurants, data]); // Add the new restaurant to the list of restaurants
    setFormState({ restaurant: '', description: '', city: '' });
  }

  function handleDelete(index) {
    const updatedRestaurants = [...restaurants];
    updatedRestaurants.splice(index, 1);
    setRestaurants(updatedRestaurants);
  }

  return (
    <div className="yelp">
      <form onSubmit={handleSubmit}>
        <label>
          Restaurant:
          <input
            type="text"
            name="restaurant"
            value={formState.restaurant}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formState.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formState.city}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit" className="crt">Create</button>
      </form>
      <div className="card-list">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="card">
            <h3>{restaurant.name}</h3>
            <p className='des'>{restaurant.description}</p>
            <p className="city">{restaurant.city}</p>
            <button onClick={() => handleDelete(index)} className="del">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Yelp;

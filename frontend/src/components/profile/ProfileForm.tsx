import React, { useState, useEffect } from 'react';
import './profileForm.css';

type myDetails = {
  firstName?:string
  lastName?:string
  additionalName?:string
  selectedPronouns?:number
  headline?:string
  country?:string
  city?:string
}
const ProfileForm = () => {
  const [selectedPronouns, setSelectedPronouns] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [additionalName, setAdditionalName] = useState('');
  const [headline, setHeadline] = useState('');
  const [country,setCountry] = useState('')
  const [city,setCity] = useState('')

  let details:myDetails = {}

function saveProfileDetails() {
  const fieldsToCheck = [
    'selectedPronouns',
    'firstName',
    'lastName',
    'additionalName',
    'headline',
    'country',
    'city',
  ];

  fieldsToCheck.forEach((field) => {
    if (field === 'selectedPronouns' && selectedPronouns) {
      details[field] = selectedPronouns;
    } else if (field === 'firstName' && firstName) {
      details[field] = firstName;
    } else if (field === 'lastName' && lastName) {
      details[field] = lastName;
    } else if (field === 'additionalName' && additionalName) {
      details[field] = additionalName;
    } else if (field === 'headline' && headline) {
      details[field] = headline;
    } else if (field === 'country' && country) {
      details[field] = country;
    } else if (field === 'city' && city) {
      details[field] = city;
    }
  });
}

  const handleDropdownChange = (e:any) => {
    setSelectedPronouns(e.target.value);
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="profile_form">
        <input
          className="first_name"
          type="text"
          placeholder="enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="last_name"
          type="text"
          placeholder="enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="additional_name"
          type="text"
          placeholder="enter additional"
          value={additionalName}
          onChange={(e) => setAdditionalName(e.target.value)}
        />
        <p>Pronouns</p>
        <div className="pronouns">
          <label htmlFor="pronouns">Please Select</label>
          <select
            name="pronouns"
            id="pronouns"
            value={selectedPronouns}
            onChange={handleDropdownChange}
          >
            <option value="please">please select</option>
            <option value="She/Her">She/Her</option>
            <option value="He/Him">He/Him</option>
            <option value="They/Them">They/Them</option>
          </select>
        </div>
        <p>Headline</p>
        <input
          className="headline"
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
        />
        <div className="location">
          <p>Location</p>
          <input className="country" type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)}/>
          <input className="city" type="text" 
          value={country} 
          onChange={(e)=>setCountry(e.target.value)}/>
        </div>
        <br />
        <div className="save_btn_container">
          <button className='save_btn' onClick={saveProfileDetails}>Save</button>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;

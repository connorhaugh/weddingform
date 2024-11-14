import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import {allNames, rehearsalDinnerNames} from './names.js'
import Select from 'react-select'

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    attendingWeekend: '',
    eventsAttending: [],
    weddingMealOne: '',
    rehearsalDinnerMealOne: '',
    weddingMealTwo: '',
    rehearsalDinnerMealTwo: '',
    dietaryRestrictions: '',
    lodging: '',
    emailOne: '',
    emailTwo:'',
  });

 
  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChange2 = (e) => {
    setFormData({ ...formData, name: e.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    fetch('https://script.google.com/macros/s/AKfycbyeGIYXIMoeH9XMkeXyjIcs__z9j0wwEyfPcp09MkygEYduc887Pg-_s6vFv0ddG-yG/exec', {
      redirect: "follow",
      method: 'POST',
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(formData) // assuming formData contains the form data
    })
    .then(response => {
      if (response.ok) {
        console.log('Form submission successful');
        alert('Form submitted successfully. You are all set');
      } else {
        console.error('Form submission failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  const invitees = allNames;
  const rehearsalDinnerInvitees = rehearsalDinnerNames;

  const inviteesOptions = invitees.map((invitee, index)=>({value: invitee, label: invitee}));


  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Type your name</label>
          <Select
            placeholder={"Type your name"}
            onChange={handleChange2}
            options={inviteesOptions}
          />
        </div>
        <div style={styles.inputGroup}>
          <p style={styles.label}>Will you be joining us for the weekend?</p>
          <div style={styles.radioGroup}>
            <input type="radio" id="accept" name="attendingWeekend" value="Accepts with pleasure" onChange={handleChange} />
            <label htmlFor="accept" style={styles.radioLabel}>Accepts with pleasure</label>
            <input type="radio" id="decline" name="attendingWeekend" value="Declines with regret" onChange={handleChange} />
            <label htmlFor="decline" style={styles.radioLabel}>Declines with regret</label>
          </div>
        </div>
        {formData.attendingWeekend === 'Declines with regret' && (
          <button type="submit" style={styles.button}>
            Submit
          </button>
        )}
        {formData.attendingWeekend === 'Accepts with pleasure' && (
          <div>
            <div style={styles.inputGroup}>
              <label htmlFor="emailOne" style={styles.label}> {formData.name.split(" & ")[0]}'s email: </label>
              <input type="text" id="emailOne" name="emailOne" value={formData.emailOne} onChange={handleChange} style={styles.input} />
              </div>
            {
              formData.name.includes("&") && (
              <div style={styles.inputGroup}>
                <label htmlFor="emailTwo" style={styles.label}> {formData.name.split(" & ")[1]}'s email: </label>
                <input type="text" id="emailTwo" name="emailTwo" value={formData.emailTwo} onChange={handleChange} style={styles.input} />
              </div>)
            }
              <div style={styles.inputGroup}>
              <p style={styles.label}>If you will be celebrating with us, please let us know which events you will attend.</p>
              {rehearsalDinnerInvitees.includes(formData.name) && (
                <div style={styles.checkboxGroup}>
                  <input type="checkbox" id="rehearsalDinner" name="eventsAttending" value="Rehearsal Dinner" onChange={handleChange} />
                  <label htmlFor="rehearsalDinner" style={styles.checkboxLabel}>Rehearsal Dinner</label>
                </div>
              )}
              <div style={styles.checkboxGroup}>
                <input type="checkbox" id="welcomeParty" name="eventsAttending" value="Welcome Party" onChange={handleChange} />
                <label htmlFor="welcomeParty" style={styles.checkboxLabel}>Welcome Party</label>
              </div>
              <div style={styles.checkboxGroup}>
                <input type="checkbox" id="weddingDay" name="eventsAttending" value="Wedding Day" onChange={handleChange} />
                <label htmlFor="weddingDay" style={styles.checkboxLabel}>Wedding Day</label>
              </div>
              <div style={styles.checkboxGroup}>
                <input type="checkbox" id="sundayBrunch" name="eventsAttending" value="Sunday Brunch" onChange={handleChange} />
                <label htmlFor="sundayBrunch" style={styles.checkboxLabel}>Sunday Brunch</label>
              </div>
            </div>
            {/* Wedding meal selection */}
            <div style={styles.inputGroup}>
              { formData.name.includes("&") ? (<p style={styles.label}> {formData.name.split(" & ")[0]}, please select your meal for the wedding dinner</p>) : (<p style={styles.label}>Select your meal for the wedding dinner</p>) }
              <div style={styles.radioGroup}>
                <input type="radio" id="salmon" name="weddingMealOne" value="Pan-roasted salmon" onChange={handleChange} />
                <label htmlFor="salmon" style={styles.radioLabel}>Pan-roasted salmon</label>
                <input type="radio" id="beef" name="weddingMealOne" value="Braised beef brisket" onChange={handleChange} />
                <label htmlFor="beef" style={styles.radioLabel}>Braised beef brisket</label>
                <input type="radio" id="pasta" name="weddingMealOne" value="Creamy mushroom pasta" onChange={handleChange} />
                <label htmlFor="pasta" style={styles.radioLabel}>Creamy mushroom pasta</label>
              </div>
            </div>
            {/* Wedding meal selection (Second Person) */}
            { formData.name.includes("&") && (
                <div style={styles.inputGroup}>
                <p style={styles.label}> {formData.name.split(" & ")[1]}, please select your meal for the wedding dinner</p>
                <div style={styles.radioGroup}>
                  <input type="radio" id="salmon" name="weddingMealTwo" value="Pan-roasted salmon" onChange={handleChange} />
                  <label htmlFor="salmon" style={styles.radioLabel}>Pan-roasted salmon</label>
                  <input type="radio" id="beef" name="weddingMealTwo" value="Braised beef brisket" onChange={handleChange} />
                  <label htmlFor="beef" style={styles.radioLabel}>Braised beef brisket</label>
                  <input type="radio" id="pasta" name="weddingMealTwo" value="Creamy mushroom pasta" onChange={handleChange} />
                  <label htmlFor="pasta" style={styles.radioLabel}>Creamy mushroom pasta</label>
                </div>
              </div>
            )}
            {/* Rehearsal dinner meal selection (if applicable) */}
            {rehearsalDinnerInvitees.includes(formData.name) && (
              <div style={styles.inputGroup}>
                { formData.name.includes("&") ? (<p style={styles.label}> {formData.name.split(" & ")[0]}, please select your meal for the rehearsal dinner</p>) : (<p style={styles.label}>Select your meal for the rehearsal dinner</p>) }
                <div style={styles.radioGroup}>
                  <input type="radio" id="pork" name="rehearsalDinnerMealOne" value="Pork" onChange={handleChange} />
                  <label htmlFor="pork" style={styles.radioLabel}>Pork</label>
                  <input type="radio" id="vegetarian" name="rehearsalDinnerMealOne" value="Vegetarian" onChange={handleChange} />
                  <label htmlFor="vegetarian" style={styles.radioLabel}>Vegetarian</label>
                </div>
              </div>
            )}
            {/* Rehearsal dinner meal selection (Second Person) */}
            {rehearsalDinnerInvitees.includes(formData.name) && formData.name.includes("&") && (
              <div style={styles.inputGroup}>
                <p style={styles.label}> {formData.name.split(" & ")[1]}, please select your meal for the rehearsal dinner</p>
                <div style={styles.radioGroup}>
                  <input type="radio" id="pork" name="rehearsalDinnerMealTwo" value="Pork" onChange={handleChange} />
                  <label htmlFor="pork" style={styles.radioLabel}>Pork </label>
                  <input type="radio" id="vegetarian" name="rehearsalDinnerMealTwo" value="Vegetarian" onChange={handleChange} />
                  <label htmlFor="vegetarian" style={styles.radioLabel}>Vegetarian</label>
                </div>
              </div>
            )}
            {/* Dietary restrictions */}
            <div style={styles.inputGroup}>
              <label htmlFor="dietary" style={styles.label}>Please let us know if there are any dietary restrictions or allergies and for which guest(s).</label>
              <input type="text" id="dietary" name="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleChange} style={styles.input} placeholder="Example: JD - shellfish, AB - peanuts" />
            </div>
            {/* Lodging */}
            <div style={styles.inputGroup}>
              <label htmlFor="lodging" style={styles.label}>Kindly let us know where you will be lodging: </label>
              <input type="text" id="lodging" name="lodging" value={formData.lodging} onChange={handleChange} style={styles.input} />
            </div>
            {/* Submit button */}
            <button type="submit" style={styles.button}>
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

// Inline styles
// Inline styles
const styles = {
  container: {
    maxWidth: '100%',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontFamily: 'Adobe Caslon Pro, serif',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666666',
    textAlign: 'center',
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '20px',
    border: '1px solid #cccccc', // Add border to input groups
    padding: '10px', // Add padding to input groups
    borderRadius: '4px', // Add border radius to input groups
  },
  label: {
    fontSize: '18px',
    marginBottom: '8px',
    display: 'block',
    textAlign: 'left',
  },
  select: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #cccccc',
    boxSizing: 'border-box',
  },
  radioGroup: {
    textAlign: 'left',
    marginBottom: '8px',
  },
  radioLabel: {
    fontSize: '16px',
    marginRight: '8px',
  },
  checkboxGroup: {
    textAlign: 'left',
    marginBottom: '8px',
  },
  checkboxLabel: {
    fontSize: '16px',
    marginLeft: '8px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #cccccc',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #007bff', // Add border to button
    cursor: 'pointer',
  },
};



function App() {
  return (
    <div className="App">
      <RSVPForm/>
    </div>
  );
}

export default App;

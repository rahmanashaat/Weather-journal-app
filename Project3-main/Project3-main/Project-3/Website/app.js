// Personal API Key for OpenWeatherMap API
const apiKey = 'your_api_key&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

// Event Listener for Generate Button
document.getElementById('generate').addEventListener('click', async () => {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  if (!zip) {
    alert('Please enter a valid zip code.');
    return;
  }

  try {
    // Fetch Weather Data
    const weatherData = await fetchWeatherData(baseURL, zip, apiKey);
    if (weatherData.cod !== 200) {
      alert(`Error: ${weatherData.message}`);
      return;
    }

    // Post Data to Server
    await postData('/add', {
      date: new Date().toLocaleDateString(),
      temp: weatherData.main.temp,
      feel: feelings || 'No feelings provided',
    });

    // Update UI
    updateUI();
  } catch (error) {
    console.error('Error:', error);
  }
});

// Fetch Weather Data from OpenWeatherMap API
const fetchWeatherData = async (url, zip, key) => {
  const response = await fetch(`${url}?zip=${zip}&appid=${key}`);
  return response.json();
};

// POST Data to Server
const postData = async (url = '', data = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error in POST:', error);
  }
};

// Update UI with Latest Data
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const data = await request.json();
    if (!data.date || !data.temp || !data.feel) {
      document.getElementById('date').innerHTML = 'No data available.';
      document.getElementById('temp').innerHTML = '';
      document.getElementById('content').innerHTML = '';
      return;
    }
    document.getElementById('date').innerHTML = `Date: ${data.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${Math.round(data.temp)}°F`;
    document.getElementById('content').innerHTML = `Feelings: ${data.feel}`;
  } catch (error) {
    console.error('Error:', error);
  }
};

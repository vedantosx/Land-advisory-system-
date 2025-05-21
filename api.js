// Convert location name to coordinates
async function geocodeLocation(location) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`
    );
    const data = await response.json();
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  }
  
  // Fetch soil data
  async function getSoilData(lat, lng) {
    const response = await fetch(
      `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lng}&lat=${lat}&property=clay&property=sand&property=silt&depth=0-5cm&value=mean`
    );
    return await response.json();
  }
  
  // Fetch climate data (replace YOUR_API_KEY)
  async function getClimateData(lat, lng) {
    const apiKey = 'YOUR_OPENWEATHERMAP_KEY';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
    );
    return await response.json();
  }
  
  // Mock flood data (real APIs require registration)
  async function getFloodData(lat, lng) {
    return {
      riskLevel: "Moderate",
      history: ["2020: Minor flooding (0.5m)", "2018: Moderate flooding (1.2m)"]
    };
  }
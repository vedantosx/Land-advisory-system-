document.addEventListener('DOMContentLoaded', () => {
    // Search button click handler
    document.getElementById('search-btn').addEventListener('click', searchLand);
  });
  
  async function searchLand() {
    const locationInput = document.getElementById('location').value.trim();
    
    // Show loading state
    document.getElementById('loading').style.display = 'block';
    
    try {
      // 1. Convert location to coordinates
      const { lat, lng } = await geocodeLocation(locationInput);
      
      // 2. Fetch all data in parallel
      const [soilData, climateData, floodData] = await Promise.all([
        getSoilData(lat, lng),
        getClimateData(lat, lng),
        getFloodData(lat, lng)
      ]);
      
      // 3. Update the UI
      updateSoilUI(soilData);
      updateClimateUI(climateData);
      updateFloodUI(floodData);
      
      // Show results
      document.getElementById('results').style.display = 'block';
      
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      document.getElementById('loading').style.display = 'none';
    }
  }
  
  // Update soil data display
  function updateSoilUI(soilData) {
    const sand = soilData.properties.sand.mean;
    const silt = soilData.properties.silt.mean;
    const clay = soilData.properties.clay.mean;
    
    document.getElementById('soil-composition').textContent = 
      `Sand: ${sand}% | Silt: ${silt}% | Clay: ${clay}%`;
    
    // Update Chart.js chart if you have one
    if (window.soilChart) {
      window.soilChart.data.datasets[0].data = [sand, silt, clay];
      window.soilChart.update();
    }
  }
  
  // Update climate data display
  function updateClimateUI(climateData) {
    document.getElementById('temperature').textContent = 
      `${climateData.main.temp}°C`;
    document.getElementById('humidity').textContent = 
      `${climateData.main.humidity}%`;
  }
  
  // Update flood data display
  function updateFloodUI(floodData) {
    document.getElementById('flood-risk').textContent = floodData.riskLevel;
    document.getElementById('flood-history').innerHTML = 
      floodData.history.map(event => `<li>${event}</li>`).join('');
  }
const axios = require('axios');

async function getAddressByPincode(pincode, country = 'IN') {
    try {
        const response = await axios.get(`https://api.zippopotam.us/${country}/${pincode}`);
        console.log(response.data);
    } catch (error) {
        console.log("Invalid Pincode or API error:", error.message);
    }
}

// Example usage
getAddressByPincode("534301"); // Connaught Place, Delhi (India)

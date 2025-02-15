import axios from "axios";

async function getAddressByPincode(pincode, country = 'IN') {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=${country}&format=json`);
        console.log(response.data);
    } catch (error) {
        console.log("Error fetching address:", error.message);
    }
}

// Example usage
getAddressByPincode("533101"); // Should return address details for Connaught Place, Delhi

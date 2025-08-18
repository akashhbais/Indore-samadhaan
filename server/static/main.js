// --- Cloudinary Configuration ---
// यहां पर आपको अपनी Cloudinary Cloud Name और Unsigned Upload Preset की वैल्यू डालनी है।
const CLOUD_NAME = "dphrwanv9"; 
const UPLOAD_PRESET = "MY-COMPLAINT-PHOTO"; 

const FORM_ENDPOINT = "/complain_page"; 

const form = document.getElementById('complaintForm');
const messageBox = document.getElementById('messageBox');
const loadingOverlay = document.getElementById('loadingOverlay');
let userLocation = null;

// --- Location Logic ---
// पेज लोड होते ही लोकेशन की जानकारी मांगें
window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            userLocation = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };
        }, function(error) {
            showMessage("Location permission denied or unavailable.", 'error');
        });
    }
};

// --- Custom Message Box Functionality ---
function showMessage(message, type = 'success') {
    messageBox.textContent = message;
    messageBox.className = `fixed top-5 right-5 p-4 rounded-lg text-white font-bold transition-opacity duration-300 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
    messageBox.style.display = 'block';
    setTimeout(() => {
        messageBox.style.opacity = '0';
        setTimeout(() => messageBox.style.display = 'none', 300);
    }, 5000);
    messageBox.style.opacity = '1';
}

// --- Main Form Submission Logic ---
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    loadingOverlay.style.display = 'flex';

    const formData = new FormData(e.target);
    const complainData = Object.fromEntries(formData.entries());
    let photoUrls = []; // Use an array to store multiple URLs

    const photoFiles = document.getElementById('photo_upload').files;

    // 1. Upload photos to Cloudinary (if files are selected)
    if (photoFiles.length > 0) {
        try {
            for (const file of photoFiles) {
                const cloudinaryFormData = new FormData();
                cloudinaryFormData.append('file', file);
                cloudinaryFormData.append('upload_preset', UPLOAD_PRESET);

                const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    body: cloudinaryFormData
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error.message || 'Cloudinary upload failed.');
                }
                
                const data = await response.json();
                photoUrls.push(data.secure_url); // Add each URL to the array
            }
        } catch (error) {
            loadingOverlay.style.display = 'none';
            showMessage(`Error uploading photos: ${error.message}`, 'error');
            return;
        }
    }

    // 2. Prepare and send the final complaint payload to FastAPI
    if (!userLocation) {
        loadingOverlay.style.display = 'none';
        showMessage("Location not detected. Please allow location access.", 'error');
        return;
    }
    
    // 'photo_upload' field को complainData से हटा दें क्योंकि यह backend model में नहीं है
    delete complainData.photo_upload;

    const payload = {
        ...complainData,
        location: userLocation,
        photo_urls: photoUrls, // Send the array of URLs
        id: undefined,
    };

    // Pydantic मॉडल के लिए इनपुट को सही प्रकार में बदलें
    // phone_number को स्ट्रिंग में बदलना सुनिश्चित करें
    payload.phone_number = String(payload.phone_number); 
    payload.age = parseInt(payload.age);

    try {
        const response = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.detail || 'Failed to submit complaint.');
        }
        
        showMessage('Complaint submitted successfully!');
        form.reset();
    } catch (error) {
        showMessage(`Error submitting complaint: ${error.message}`, 'error');
    } finally {
        loadingOverlay.style.display = 'none';
    }
});

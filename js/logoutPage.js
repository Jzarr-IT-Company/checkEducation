// Function to get a specific cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to check if the user has a valid token 
const checkToken = () => {
    const tokenCookie = getCookie('token');
    const idCookie = getCookie('id');
    const isCourseCookie = getCookie('isCourse');
    localStorage.removeItem("courses");
    if (!tokenCookie) {
        // No token found; redirect to the home page
        window.location.href = './index.html'; // Change this to your home page URL
    }
}

// Call the function to check token and potentially redirect the user
checkToken();
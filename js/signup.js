 // Get the current URL
 const url = window.location.href;

 // Create a new URL object
 const urlObj = new URL(url);

 // Get the parameter value by its name
 const cn = urlObj.searchParams.get('cn');
 console.log(cn)

document.querySelector("#createAccount").addEventListener("click", () => {
    document.getElementById('loader').style.display = 'flex';

    let fname = document.querySelector("#fname").value.trim();
    let lname = document.querySelector("#lname").value.trim();
    let email = document.querySelector("#email").value.trim();
    let pass = document.querySelector("#password").value.trim();
    let phoneInput = document.getElementById('phoneNo').value;
    let phoneError = document.getElementById('phoneError');
    
    let isValid = true;

    // Clear previous error messages
    document.querySelector("#fnameError").innerText = '';
    document.querySelector("#lnameError").innerText = '';
    document.querySelector("#emailError").innerText = '';
    document.querySelector("#passError ").innerText = '';

    // Remove non-digit characters
    const cleanedPhone = phoneInput.replace(/\D/g, '');

    // Validate phone number length
    if (cleanedPhone.length !== 11) {
        phoneError.textContent = 'Phone number must be exactly 11 digits.';
        document.getElementById('phoneError').innerHTML="invalid phone number"; // Add Bootstrap invalid class for visual feedback
    } 
    // const nameRegex = /^[a-zA-Z]{2,}$/;
    // if (!nameRegex.test(fname)) {
    //     document.querySelector("#fnameError").innerText = 'First name must contain at least 2 alphabetic characters.';
    //     isValid = false;
    // }

    // Last Name Validation
    if (!nameRegex.test(lname)) {
        document.querySelector("#lnameError").innerText = 'Last name must contain at least 2 alphabetic characters.';
        isValid = false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.querySelector("#emailError").innerText = 'Please enter a valid email address.';
        isValid = false;
    }

    // Password Validation
    const passRegex = /^.{8,}$/;
    if (!passRegex.test(pass)) {
        document.querySelector("#passError").innerText = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.';
        isValid = false;
    }
    // buyMore
    let isOnline = localStorage.getItem("onlineBuy")
    let buyMore = localStorage.getItem("buyMore")
    if (isValid) {
        const name = fname + " " + lname;
        const obj = { name, email, pass }
        axios.post('https://main-server-zeta.vercel.app/signup', {
            name: name,
            email: email,
            password: pass,
            courses:cn,
            phone: phoneInput
        })
            .then(response => {
                document.getElementById('loader').style.display = 'none';
                if (response.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Account create successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    }).then((result) => {
                        if (result) {
                            const maxAge = 20 * 365 * 24 * 60 * 60; // 20 years in seconds
                            document.cookie = `token=${response.data.token.token}; path=/; max-age=${maxAge}; Secure; SameSite=Strict`;
                            document.cookie = `id=${response.data.id}; path=/; max-age=${maxAge}; Secure; SameSite=Strict`;
                            if (isOnline) {
                                localStorage.removeItem("onlineBuy")
                                window.location.href = `https://payment-gateway-beryl.vercel.app/?ac=2700`
                            }else if(buyMore){
                                localStorage.removeItem("buyMore")
                                window.location.href = "./selecteCourses.html"
                            }
                            else {
                                window.location.href = "./profile.html"
                            }
                        }
                    })
                    // const maxAge = 20 * 365 * 24 * 60 * 60; // 20 years in seconds
                    // document.cookie = `token=${response.data.token.token}; path=/; max-age=${maxAge}; Secure; SameSite=Strict`;
                    // document.cookie = `id=${response.data.id}; path=/; max-age=${maxAge}; Secure; SameSite=Strict`;
                    // window.location.href = "./profile.html"
                }
            })
            .catch(error => {
                document.getElementById('loader').style.display = 'none';
                console.error('Error creating account:', error.message);
            });
    }
});
// ============================== GET COOKIES DATA =======================
// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
const nameCookie = getCookie('name');
const emailCookie = getCookie('email');
document.querySelector("#login").addEventListener("click", () => {
    document.getElementById('loader').style.display = 'flex';

    // Show loader
    document.getElementById('loader').style.display = 'flex';


    let email = document.querySelector("#email").value.trim();
    let pass = document.querySelector("#password").value.trim();

    // Clear previous error messages
    document.querySelector("#emailError").innerText = '';
    document.querySelector("#passError").innerText = '';

    // Validate fields
    let isValid = true;

    if (email === '') {
        document.getElementById('loader').style.display = 'none';
        document.querySelector("#emailError").innerText = 'Email is required.';
        isValid = false;
    }

    if (pass === '') {
        document.getElementById('loader').style.display = 'none';
        document.querySelector("#passError").innerText = 'Password is required.';
        isValid = false;
    }

    if (isValid) {
        axios.post('https://main-server-zeta.vercel.app/login', {
            email: email,
            password: pass
        })
            .then(response => {
                document.getElementById('loader').style.display = 'none';
                if (response.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    }).then((result) => {
                        if (result) {
                            document.getElementById('loader').style.display = 'none';
                            const token = response.data.token;
                            const maxAge = 20 * 365 * 24 * 60 * 60;
                            document.cookie = `token=${token}; path=/; max-age=${maxAge}; Secure; SameSite=Strict`;
                            document.cookie = `id=${response.data.id}; path=/; max-age=${maxAge}; Secure; SameSite=Strict`;
                            document.cookie = `isCourse=${true}; path=/; max-age=${maxAge}; Secure; SameSite=Strict`;
                            window.location.href = "./dashboard.html"
                        }
                    })
                    // const token = response.data.token;
                    // const maxAge = 20 * 365 * 24 * 60 * 60; 
                    // document.cookie = `token=${token}; path=/; max-age=${maxAge}; Secure; SameSite=Strict`;
                    // document.cookie = `id=${response.data.id}; path=/; max-age=${maxAge}; Secure; SameSite=Strict`;
                    // window.location.href = "./index.html"
                }
            })
            .catch(error => {
                document.getElementById('loader').style.display = 'none';
                console.error('Error logging in:', error);

                Swal.fire({
                    title: "Login failed. Please check your credentials.",
                    text: error.message,
                    icon: "error"
                })
            });
    }
});
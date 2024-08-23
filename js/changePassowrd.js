document.querySelector("#changePassword").addEventListener('click', () => {
    document.getElementById('loader').style.display = 'flex';

    const email = document.querySelector("#email").value;
    const pass = document.querySelector("#password").value;
    const confirmPass = document.querySelector("#confirmPassword").value;

    if (email.trim() === "") {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Please enter your email address.",
            showConfirmButton: false,
            timer: 1500
        })
        return;
    }

    if (pass === "" || confirmPass === "") {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Password fields cannot be empty.",
            showConfirmButton: false,
            timer: 1500
        })
        return;
    }

    if (pass === confirmPass) {
        axios.post('https://main-server-zeta.vercel.app/updatepassword', { email, pass })
            .then((res) => {
                document.getElementById('loader').style.display = 'none';
                if (res.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Password updated successfully!",
                        showConfirmButton: false,
                        timer: 3000
                    }).then((result) => {
                        if (result) {
                            window.location.href = "./login.html"
                        }
                    })
                }
            })
            .catch(error => {
                document.getElementById('loader').style.display = 'none';
                console.log(error);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "An error occurred while updating the password.",
                    showConfirmButton: false,
                    timer: 2000
                })
            });
    } else {
        document.getElementById('loader').style.display = 'none';
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Passwords do not match. Please try again.",
            showConfirmButton: false,
            timer: 1500
        })
    }
});

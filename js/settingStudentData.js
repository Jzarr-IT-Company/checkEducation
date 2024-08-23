function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const tokenCookie = getCookie('token');
const idCookie = getCookie('id');

const getData = async () => {
    document.getElementById('loader').style.display = 'flex';
    try {
        const myemail = document.querySelector("#nemail");
        const myname = document.querySelector("#nname");
        const nemailElement = document.querySelector("#mysemail");
        const myImageElement = document.querySelector("#myImage");
        const myProfileImage = document.querySelector("#myProfileImage");
        // nname
        const response = await axios.get(`https://main-server-zeta.vercel.app/getStudentData/${idCookie}`,
            {
                headers: {
                    'Authorization': `Bearer ${tokenCookie}`
                }
            });
        if (response.data.status === 200) {
            document.getElementById('loader').style.display = 'none';
            let getData = await response.data.data;
            getData.map((data) => {
                if (myemail && nemailElement) {
                    nemailElement.innerHTML = data.email;
                    myemail.innerHTML = data.email;
                } else {
                    console.error('Element with ID #nemail not found.');
                }
                if (myname) {
                    myname.innerHTML = data.name
                }

                if (myProfileImage && myImageElement && data.profileImage) {
                    myImageElement.src = data.profileImage;
                    myProfileImage.src = data.profileImage;
                } else if (!myImageElement) {
                    console.error('Element with ID #myImage not found.');
                }

            })
        }
    } catch (error) {
        document.getElementById('loader').style.display = 'none';
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }
}
getData()


document.querySelector("#uploadImage").addEventListener("click", () => {
    document.getElementById('loader').style.display = 'flex';
    const fileInput = document.querySelector("#image");
    if (fileInput.files.length > 0) {
        const imageFile = fileInput.files[0];

        const formData = new FormData();
        formData.append('file', imageFile);

        axios.post('https://images-apis-cklz.vercel.app/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(async (response) => {
                console.log(response.data.url)
                const image = await response.data.url
                axios.post('https://main-server-zeta.vercel.app/updateImage', { id: idCookie, image })
                    .then(async (response) => {
                        document.getElementById('loader').style.display = 'none';

                        if (response.status === 200) {
                            document.getElementById('loader').style.display = 'none';
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Image Updated successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            }).then((result) => {
                                if (result) {
                                    window.location.reload()
                                }
                            })
                        }
                        console.log()
                    }).catch(error => {
                        document.getElementById('loader').style.display = 'none';
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "some thing went wrong!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            })
            .catch(error => {
                document.getElementById('loader').style.display = 'none';
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "some thing went wrong!",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.error('Error uploading image:', error.message, error.code);
            });
    } else {
        document.getElementById('loader').style.display = 'none';
        Swal.fire({
            position: "center",
            icon: "error",
            title: "No file selected.",
            showConfirmButton: false,
            timer: 1500
        });
        console.log('No file selected.');
    }
})

document.querySelector("#saveName").addEventListener("click", () => {
    document.getElementById('loader').style.display = 'flex';
    const updatename = document.querySelector("#updateName").value;
    if (updatename !== null) {
        console.log(updatename)
        axios.post('https://main-server-zeta.vercel.app/updateName', { id: idCookie, name: updatename })
            .then(async (response) => {
                document.getElementById('loader').style.display = 'none';
                if (response.status === 200) {
                    document.getElementById('loader').style.display = 'none';
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Name Updated Successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    }).then((result) => {
                        if (result) {
                            window.location.reload()
                        }
                    })
                }
            }).catch(error => {
                document.getElementById('loader').style.display = 'none';
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "some thing went wrong!",
                    showConfirmButton: false,
                    timer: 3000
                });
            })
    } else {
        document.getElementById('loader').style.display = 'none';
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Please Enter your name .",
            showConfirmButton: false,
            timer: 1500
        });
        console.log('No file selected.');
    }
})

document.querySelector("#saveEmail").addEventListener("click", () => {
    document.getElementById('loader').style.display = 'flex';
    const updateemail = document.querySelector("#updateEmail").value;
    if (updateemail !== null) {
        console.log(updateemail)
        axios.post('https://main-server-zeta.vercel.app/updateEmail', { id: idCookie, email: updateemail })
            .then(async (response) => {
                document.getElementById('loader').style.display = 'none';
                if (response.status === 200) {
                    document.getElementById('loader').style.display = 'none';
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Name Updated Successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    }).then((result) => {
                        if (result) {
                            window.location.reload()
                        }
                    })
                }
            }).catch(error => {
                document.getElementById('loader').style.display = 'none';
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "some thing went wrong!",
                    showConfirmButton: false,
                    timer: 3000
                });
            })
    } else {
        document.getElementById('loader').style.display = 'none';
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Please Enter your name .",
            showConfirmButton: false,
            timer: 1500
        });
        console.log('No file selected.');
    }
})

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

const logout = async () => {
    try {
        deleteCookie('token');
        deleteCookie('id');
        deleteCookie('isCourse');
        window.location.href = "./index.html"

    } catch (error) {
        console.error('Error during logout:', error);
    }
};

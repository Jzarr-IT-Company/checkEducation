
const fileInput = document.querySelector("#fileInput");
const previewImage = document.getElementById("previewImage");
let image;

fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
        const imageFile = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            previewImage.src = e.target.result;
        };

        reader.readAsDataURL(imageFile);

        const formData = new FormData();
        formData.append('file', imageFile);

        axios.post('https://images-apis-cklz.vercel.app/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response.data.url)
                image = response.data.url;
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
    } else {
        console.log('No file selected.');
    }
});
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}




document.querySelector("#nextBtn").addEventListener('click', () => {
    document.getElementById('loader').style.display = 'flex';
    document.getElementById('errorqualificationSelect').innerText = '';
    document.getElementById('errorphoneNumber').innerText = '';
    document.getElementById('erroremail').innerText = '';
    document.getElementById('errorcountry').innerText = '';
    document.getElementById('errorcity').innerText = '';
    document.getElementById('errorDOB').innerText = '';
    document.getElementById('errorfirstName').innerText = '';
    document.getElementById('errorlastName').innerText = '';
    document.getElementById('errorradios').innerText = '';
    document.getElementById('errorgenderRadios').innerText = '';

    const qualificationSelect = document.getElementById('qualificationSelect').value;
    const SpecializationSelect = document.getElementById('Specialization').value;
    const currentStatus = document.getElementById('currentStatus').value;
    const futurePlans = document.getElementById('futurePlans').value;
    const phoneNumber = document.getElementById('phonno').value;
    const email = document.getElementById('email').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const DOB = document.getElementById('DOB').value;
    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const lastName = document.getElementById('lastName').value;
    const radios = document.getElementsByName('computer');
    const genderRadios = document.getElementsByName('gender');
    const fullname = firstName + " " + middleName + " " + lastName;

    let selected;
    let selectedGender;
    let isValid = true;

    for (const radio of radios) {
        if (radio.checked) {
            selected = radio.value;
            break;
        }
    }
    for (const radio of genderRadios) {
        if (radio.checked) {
            selectedGender = radio.value;
            break;
        }
    }

    if (!firstName) {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('errorfirstName').innerText = 'First name is required';
        isValid = false;
    }
    if (!lastName) {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('errorlastName').innerText = 'Last name is required';
        isValid = false;
    }
    if (!phoneNumber) {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('errorphoneNumber').innerText = 'Phone number is required';
        isValid = false;
    }
    if (!email) {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('erroremail').innerText = 'Email is required';
        isValid = false;
    }
    if (!country) {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('errorcountry').innerText = 'Country is required';
        isValid = false;
    }
    if (!city) {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('errorcity').innerText = 'City is required';
        isValid = false;
    }
    if (!DOB) {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('errorDOB').innerText = 'Date of Birth is required';
        isValid = false;
    }
    if (!qualificationSelect) {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('errorqualificationSelect').innerText = 'Qualification is required';
        isValid = false;
    }
    if (!selected) {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('errorradios').innerText = 'Please select a computer option';
        isValid = false;
    }
    if (!selectedGender) {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('errorgenderRadios').innerText = 'Please select a gender option';
        isValid = false;
    }
    const data = {
        name: fullname,
        phone: phoneNumber,
        email: email,
        country,
        city: city,
        DOB: DOB,
        graduation: qualificationSelect,
        specialization: SpecializationSelect,
        currentStatus: currentStatus,
        futurePlan: futurePlans,
        IsComputer: selected,
        gender: selectedGender,
        profileImage: image
    };

    try {
        // Check cookies after login
        const tokenCookie = getCookie('token');
        const idCookie = getCookie('id');

        axios.post(`https://main-server-zeta.vercel.app/update`, { id: idCookie, data: data })
            .then(response => {
                document.getElementById('loader').style.display = 'none';
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Account create successfully!",
                    showConfirmButton: false,
                    timer: 1500
                }).then((result)=>{
                    if(result){
                        window.location.href = "./selecteCourses.html"
                    }
                })
            })
            .catch(error => {
                document.getElementById('loader').style.display = 'none';
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "some thing went wrong",
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "some thing went wrong",
            showConfirmButton: false,
            timer: 1500
        })
    }

});
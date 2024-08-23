window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        localStorage.clear();
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}
const idCookie = getCookie('id');
const isCourse = getCookie('isCourse');
const tokenCookie = getCookie('token');

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.course-checkbox');
    const submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', () => {
        // Show loader
        document.getElementById('loader').style.display = 'flex';

        const selectedCourses = [];

        const coursePrice = 2700;

        checkboxes.forEach(checkbox => {
            const courseDiv = checkbox.parentElement;
            if (checkbox.checked) {
                saveCourse(courseDiv.getAttribute('data-course'))
                selectedCourses.push(courseDiv.getAttribute('data-course'));
            }
        });

        if (selectedCourses.length === 0) {
            document.getElementById('loader').style.display = 'none';
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Select at least one course.",
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }



        // Calculate total cost
        const totalCost = coursePrice * selectedCourses.length;
        let courses = JSON.parse(localStorage.getItem(idCookie)) || [];
        try {

            const idCookie = getCookie('id');
            axios.post('https://main-server-zeta.vercel.app/courseUpdate', { id: idCookie, courses: courses })
                .then(response => {
                    console.log(response)
                    document.getElementById('loader').style.display = 'none';
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Courses Submit successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    }).then((result) => {
                        if (result) {
                            // window.location.href='./success.html'
                            window.location.href = `https://payment-gateway-beryl.vercel.app/?ac=${totalCost}`
                        }
                    })
                })
                .catch(error => {
                    document.getElementById('loader').style.display = 'none';
                    console.error('Error', error.message);
                    Swal.fire({
                        title: 'Error add course. Please try again.',
                        icon: 'error',
                        customClass: {
                            confirmButton: 'bttn'
                        }
                    });
                });
        } catch (error) {
            document.getElementById('loader').style.display = 'none';
            console.log("error", error.message);
        }
    });

    document.querySelectorAll('.border').forEach(div => {
        div.addEventListener('click', () => {
            const checkbox = div.querySelector('.course-checkbox');
            checkbox.checked = !checkbox.checked;
        });
    });
});
const saveCourse = async (courseName) => {
    try {
        // Retrieve the existing courses from localStorage or initialize to an empty array
        let courses = JSON.parse(localStorage.getItem(idCookie)) || [];
        let newCourseTem = JSON.parse(localStorage.getItem("newCoursesTem")) || [];

        // Check if the course already exists in the array to prevent duplicates
        if (!courses.includes(courseName)) {
            // Add the new course to the array
            courses.push(courseName);
            newCourseTem.push(courseName)
            // Save the updated array back to localStorage
            localStorage.setItem(idCookie, JSON.stringify(courses));
            localStorage.setItem("newCoursesTem", JSON.stringify(newCourseTem));
        } else {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Course already exists!",
                showConfirmButton: false,
                timer: 1500
            })
            return
        }
    } catch (error) {
        console.log('Error saving course:', error.message);
    }
}


// new code add data in cookies

// const addCourseOnCookie = async (courses) => {
//     // Existing courses ko cookie se retrieve karna
//     const existingCoursesJSON = getCookie('courses');
//     let existingCourses = [];

//     if (existingCoursesJSON) {
//         // JSON string ko array mein parse karna
//         existingCourses = JSON.parse(existingCoursesJSON);
//     }

//     // New courses ko existing courses ke saath merge karna
//     if (Array.isArray(courses)) {
//         // Flatten the array if courses is a nested array
//         const flatCourses = courses.flat();
//         existingCourses = [...existingCourses, ...flatCourses];
//     } else {
//         existingCourses.push(courses);
//     }

//     // Merged array ko JSON string mein convert karna
//     const coursesJSON = JSON.stringify(existingCourses);
//     console.log(coursesJSON)
//     // const maxAge = 20 * 365 * 24 * 60 * 60; // 20 years in seconds
//     // document.cookie = `token=${response.data.token.token}; path=/; max-age=${maxAge}; Secure; SameSite=Strict`;
// }












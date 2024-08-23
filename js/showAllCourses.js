const displayCourses = async (courses) => {

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null; // Return null if the cookie is not found
    }

    // Check cookies after login
    const tokenCookie = getCookie('token');
    // Loading indicator ko show karen
    document.querySelector("#loadingIndicator").innerHTML = `
     <div id="loader" class="loader">
        <div class="spinner"></div>
    </div>
    `;
    // Show loader
    document.getElementById('loader').style.display = 'flex';
    try {

        document.querySelector("#showAllCourses").innerHTML = ''; // Clear previous courses
        courses.map((course) => {
            const courseDescription = course.coursedescription.split(" ").slice(0, 6).join(" ") + '...';

            document.querySelector("#showAllCourses").innerHTML += `
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="card" style="height:380px">
                        <img src="${course.Courseimage}" class="card-img-top custom-img" style="height: 180px;" alt="">
                        <div class="card-body mt-3">
                            <h5 class="card-title fw-bold">${course.coursename}</h5>
                            <p class="card-text">${courseDescription}</p>
                            <div class="d-flex justify-content-between mt-4">
                                <a href="#" class="text-success fw-semibold buy-now" data-course-id="${course.courseid}">Buy Now</a>
                                <a href="./detailCourses.html?cid=${course._id}" class="text-success fw-semibold">View Detail</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        // Attach event listeners to "Buy Now" buttons after the courses are rendered
        const buyNowButtons = document.querySelectorAll(".buy-now");
        buyNowButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent the default link action detailCourses.html

                if (tokenCookie) {
                    // alert('Success! You are authorized to purchase this course.');
                    window.location.href = "./selecteCourses.html"
                    // Here you can also implement the logic to proceed with the purchase
                } else {
                    window.location.href = '/signup.html'; // Redirect to the signup page if the token is not found
                }
            });
        });
        document.getElementById('loader').style.display = 'none';
    } catch (error) {
        console.log("error", error.message);
        document.getElementById('loader').style.display = 'none';
    }
}

// Function to get all courses
const getAllCourses = async () => {
    document.getElementById('loader').style.display = 'flex';
    try {
        const response = await fetch('https://main-server-zeta.vercel.app/getAllCOurses');
        const data = await response.json();
        if (data.status === 200) {
            document.getElementById('loader').style.display = 'none';
            displayCourses(data.response); // Display courses
        } else {
            console.log(error.message)
            document.getElementById('loader').style.display = 'none';
        }
    } catch (error) {
        document.getElementById('loader').style.display = 'none';
        console.log("error", error.message);
    }
};

// Function to search courses
const searchCourses = async () => {
    document.getElementById('loader').style.display = 'flex';
    const searchBar = document.querySelector("#search").value;
    try {
        const response = await axios(`https://main-server-zeta.vercel.app/searchCourses?coursename=${searchBar}`);
        console.log(response.data.status); // Display searched courses
        if (response.data.status === 200) {
            document.getElementById('loader').style.display = 'none';
            displayCourses(response.data.response); // Display courses
        } else {
            console.log(error.message)
            document.getElementById('loader').style.display = 'none';
        }
    } catch (error) {
        console.log("error", error.message);
    }
};

document.querySelector("#getSearch").addEventListener("click", searchCourses);
getAllCourses();

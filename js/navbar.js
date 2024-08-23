function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    // const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Check cookies after login
const tokenCookie = getCookie('token');

if (tokenCookie) {

    // console.log('Token cookie exists from home page:', tokenCookie);
    document.getElementById("navbar").innerHTML
        = `
     <div class="container-fluid sticky-top bg-light py-2 d-none d-lg-block d-md-none abc">
                <div class="row">
                    <div class="col-12 d-flex">
                        <ul class="nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link text-secondary fw-semibold active" aria-current="page"
                                    href="index.html">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-secondary fw-semibold active" aria-current="page"
                                    href="courses.html">All Courses</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-secondary fw-semibold" href="about.html">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-secondary fw-semibold" href="./faq.html">FAQ</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-secondary fw-semibold" href="./dashboard.html">Dashboard</a>
                            </li>
                        </ul>
                        <div class="d-flex align-items-center" style="font-size: 14px; gap: 10px;">
                           <button class="px-3 py-1 fw-semibold rounded-3 text-white border-none; text-decoration-none" style="font-size: 14px;border: none; background-color: #299d09;"id="joinClass" >
                    <span><i class="fa-solid fa-circle-dot me-2"></i> Join Live Class
                    </button>
                           <button class="px-3 py-1 fw-semibold rounded-3 text-white border-none; text-decoration-none" style="font-size: 14px;border: none;background-color: #023901;" id="physicalclasses">
                   <span><i class="fa-solid fa-computer me-2"></i></span > Physical Class
                    </button>
                        </div>
                    </div>
                </div>
            </div>
    `
} else {
    document.getElementById("navbar").innerHTML
        = `
    <div class="container-fluid sticky-top bg-light py-2 d-none d-lg-block d-md-none">
            <div class="row">
                <div class="col-12 d-flex">
                    <ul class="nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link text-secondary fw-semibold active" aria-current="page" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-secondary fw-semibold active" aria-current="page" href="courses.html">All Courses</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-secondary fw-semibold" href="./about.html">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-secondary fw-semibold" href="./faq.html">FAQ</a>
                        </li>
                    </ul>
                    <div style="gap: 10px;">
                    <button class="px-3 py-1 fw-semibold rounded-3 text-white border-none; text-decoration-none" style="font-size: 14px;border: none; background-color: #299d09;"id="joinClass" >
                    <span><i class="fa-solid fa-circle-dot me-2"></i> Join Live Class
                    </button>
                     <button class="px-3 py-1 fw-semibold rounded-3 text-white border-none; text-decoration-none" style="font-size: 14px;border: none;background-color: #023901;" id="physicalclasses">
                   <span><i class="fa-solid fa-computer me-2"></i></span > Physical Class
                    </button>
                        <a href="./login.html" class="px-3 text-decoration-none text-dark border-none" style="border: none;" >Login</a>
                    </div>
                </div>
            </div>
        </div> 
    `
}

document.querySelector("#physicalclasses").addEventListener("click", () => {
    window.location.href = "physicalForm.html"
})
document.querySelector("#joinClass").addEventListener("click", () => {
    if (tokenCookie) {
        window.location.href = "./selecteCourses.html"
    } else {
        window.location.href = "./signup.html"
    }
})

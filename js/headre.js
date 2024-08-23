function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}
const idCookie = getCookie('id');
const token = getCookie('token');
const isCourse = getCookie('isCourse');

if(token){
    document.getElementById("header").innerHTML = `
      <nav class="d-flex d-lg-none d-md-none align-items-center px-5 py-2 navbar-custom"
            style="background-color: #f5f5f5">
            <button class="border-none fs-4" style="border: none; background: transparent;" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample">
                <i class="fa-solid fa-bars-staggered"></i>
            </button>
            <div class="d-flex flex-grow-1 justify-content-center">
                <a href="./index.html"><img src="Assets/logo.svg" class="navbar-brand" alt="Logo"></a>
            </div>
        </nav>
        <nav class="d-none d-lg-flex d-md-flex d-xl-flex justify-content-between align-items-center px-5 py-2 navbar-custom"
            style="background-color: #f5f5f5">
            <button id="btn-primary" class="border-none fs-4" style="border: none; background: transparent;" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <i class="fa-solid fa-bars-staggered"></i>
            </button>
            <a href="./index.html"><img src="Assets/logo.svg" class="navbar-brand" alt="Logo"></a>
            <div class="d-flex d-none d-lg-flex d-md-flex" style="gap: 10px;">
                <div class="border border-dark d-flex justify-content-center align-items-center" style="border-radius: 50%; width: 40px; height: 40px;">
                            <a target="_blank" href="https://www.facebook.com/jzarriteducation/" class=" text-dark text-decoration-none fw-semibold">
                                <i class="fs-6 fa-brands fa-facebook-f"></i>
                            </a>
                        </div>
                        <div  class="border border-dark d-flex justify-content-center align-items-center" style="border-radius: 50%; width: 40px; height: 40px;">
                            <a target="_blank" href="https://www.instagram.com/jzarri.teducation/?fbclid=IwZXh0bgNhZW0CMTEAAR3_OVsGWPIbZR3mcGXx6sIoBfb4hi1cqiq8maK4Cum3svMOkJ-mGaH1c3c_aem_5w6Ru_c-gbpXZ9N_rka6RQ" class="text-dark text-decoration-none fw-semibold">
                                <i class="fs-6 fa-brands fa-instagram"></i>
                            </a>
                        </div>
                        <div  class="border border-dark d-flex justify-content-center align-items-center" style="border-radius: 50%; width: 40px; height: 40px;">
                            <a target="_blank" href="https://youtube.com/@waseemjakhrani1?si=ig6kFjKsu-QVYclq" class=" text-decoration-none fw-semibold text-dark">
                                <i class="fs-6 fa-brands fa-youtube"></i>
                            </a>
                        </div>
            </div>
        </nav>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header border-bottom">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">
                    <img src="./Assets/logo.svg" width="70" alt="">
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="py-3 px-2 bg_color">
                    <a href="./index.html" class="link fw-semibold text-dark fs-5 text-decoration-none">Home</a>
                </div>
                <div class=" py-3 px-2">
                    <a href="./courses.html" class="link fw-semibold text-dark fs-5 text-decoration-none">All Courses</a>
                </div>
                <div class=" py-3 px-2">
                    <a href="./about.html" class="link fw-semibold text-dark fs-5 text-decoration-none">About</a>
                </div>
                <div class=" py-3 px-2">
                    <a href="./faq.html" class="link fw-semibold text-dark fs-5 text-decoration-none">FAQ's</a>
                </div>
                <div class=" py-3 px-2">
                    <a href="./dashboard.html" class="link fw-semibold text-dark fs-5 text-decoration-none">Dashboard</a>
                </div>
            </div>
        </div>
    
    
    `
}else{
    document.getElementById("header").innerHTML = `
  <nav class="d-flex d-lg-none d-md-none align-items-center px-5 py-2 navbar-custom"
        style="background-color: #f5f5f5">
        <button class="border-none fs-4" style="border: none; background: transparent;" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample">
            <i class="fa-solid fa-bars-staggered"></i>
        </button>
        <div class="d-flex flex-grow-1 justify-content-center">
            <a href="./index.html"><img src="Assets/logo.svg" class="navbar-brand" alt="Logo"></a>
        </div>
    </nav>
    <nav class="d-none d-lg-flex d-md-flex d-xl-flex justify-content-between align-items-center px-5 py-2 navbar-custom"
        style="background-color: #f5f5f5">
        <button id="btn-primary" class="border-none fs-4" style="border: none; background: transparent;" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <i class="fa-solid fa-bars-staggered"></i>
        </button>
        <a href="./index.html"><img src="Assets/logo.svg" class="navbar-brand" alt="Logo"></a>
        <div class="d-flex d-none d-lg-flex d-md-flex" style="gap: 10px;">
            <div class="border border-dark d-flex justify-content-center align-items-center" style="border-radius: 50%; width: 40px; height: 40px;">
                        <a target="_blank" href="https://www.facebook.com/jzarriteducation/" class=" text-dark text-decoration-none fw-semibold">
                            <i class="fs-6 fa-brands fa-facebook-f"></i>
                        </a>
                    </div>
                    <div  class="border border-dark d-flex justify-content-center align-items-center" style="border-radius: 50%; width: 40px; height: 40px;">
                        <a target="_blank" href="https://www.instagram.com/jzarri.teducation/?fbclid=IwZXh0bgNhZW0CMTEAAR3_OVsGWPIbZR3mcGXx6sIoBfb4hi1cqiq8maK4Cum3svMOkJ-mGaH1c3c_aem_5w6Ru_c-gbpXZ9N_rka6RQ" class="text-dark text-decoration-none fw-semibold">
                            <i class="fs-6 fa-brands fa-instagram"></i>
                        </a>
                    </div>
                    <div  class="border border-dark d-flex justify-content-center align-items-center" style="border-radius: 50%; width: 40px; height: 40px;">
                        <a target="_blank" href="https://youtube.com/@waseemjakhrani1?si=ig6kFjKsu-QVYclq" class=" text-decoration-none fw-semibold text-dark">
                            <i class="fs-6 fa-brands fa-youtube"></i>
                        </a>
                    </div>
        </div>
    </nav>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header border-bottom">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">
                <img src="./Assets/logo.svg" width="70" alt="">
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="py-3 px-2 bg_color">
                <a href="./index.html" class="link fw-semibold text-dark fs-5 text-decoration-none">Home</a>
            </div>
            <div class=" py-3 px-2">
                <a href="./courses.html" class="link fw-semibold text-dark fs-5 text-decoration-none">All Courses</a>
            </div>
            <div class=" py-3 px-2">
                <a href="./about.html" class="link fw-semibold text-dark fs-5 text-decoration-none">About</a>
            </div>
            <div class=" py-3 px-2">
                <a href="./faq.html" class="link fw-semibold text-dark fs-5 text-decoration-none">FAQ's</a>
            </div>
            <div class=" py-3 px-2">
                <a href="./login.html" class="link fw-semibold text-dark fs-5 text-decoration-none">Login</a>
            </div>
        </div>
    </div>
`
}
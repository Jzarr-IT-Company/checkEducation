const getCourses = async () => {
    // Loading indicator ko show karen
    document.querySelector("#loadingIndicator").innerHTML = `
     <div id="loader" class="loader">
        <div class="spinner"></div>
    </div>
    `;

    try {
        const response = await fetch('https://main-server-zeta.vercel.app/getAllCOurses');
        const data = await response.json();

        const firstEightCourses = data.response.slice(0, 8);

        firstEightCourses.map((course) => {
            const courseDescription = course.coursedescription.split(" ").slice(0, 8).join(" ") + '...';

            document.querySelector("#showCourses").innerHTML += `
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="card custom-card">
                        <img src="${course.Courseimage}" class="card-img-top custom-img" style="height: 180px;" alt="">
                        <div class="card-body mt-3">
                            <h5 class="card-title fw-bold">${course.coursename}</h5>
                            <p class="card-text">${courseDescription}</p>
                            <div class="d-flex justify-content-between mt-4">
                                <a href="./detailCourses.html?cid=${course._id}&cn=${course.coursename}" class="text-success fw-semibold">Buy Now</a>
                                <a href="./detailCourses.html?cid=${course._id}&cn=${course.coursename}" class="text-success fw-semibold">View Detail</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        document.querySelector("#loadingIndicator").style.display = "none";
    } catch (error) {
        console.log("error", error.message);

        // Agar error ho, to bhi loading indicator ko hide karen
        document.querySelector("#loadingIndicator").style.display = "none";
    }
}

getCourses();

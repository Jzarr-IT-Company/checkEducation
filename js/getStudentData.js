
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const tokenCookie = getCookie('token');
const idCookie = getCookie('id');
const isCourse = getCookie('isCourse');
const getCourses = JSON.parse(localStorage.getItem("courses"));



const getData = async () => {
    // document.getElementById('loader').style.display = 'flex';

    try {
        const nemailElement = document.querySelector("#nemail");
        const myemail = document.querySelector("#myemail");
        const myname = document.querySelector("#nname");
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
            let getData = await response.data.data;
            getData.map((data) => {
                console.log(data)

                getcourses(data._id,data.courses)
                if (nemailElement && myemail) {
                    nemailElement.innerHTML = data.email;
                    myemail.innerHTML = data.email;
                } else {
                    console.error('Element with ID #nemail not found.');
                }
                if(myname){
                    myname.innerHTML=data.name
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

console.log(idCookie)

async function getcourses(id,name) {
    
    if (id) {
        axios.post('https://main-server-zeta.vercel.app/selectedGetCourses', {
            coursename: name
        },
            {
                headers: {
                    'Authorization': `Bearer ${tokenCookie}`
                }
            })
            .then(async (response) => {
                // document.getElementById('loader').style.display = 'none';
                if(response){
                    let getCourses = await response.data.data;
                    let showBuyCourses = document.querySelector('#showBuyCourses');
                    console.log(response)
                    getCourses.map((data) => {
                        const truncatedDescription = data.coursedescription.substring(0, 50) + '...';
                        showBuyCourses.innerHTML += `
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <div class="card">
                                <img src="${data.Courseimage}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title text-capitalize">${data.coursename}</h5>
                                    <p class="card-text">${truncatedDescription}</p>
                                    <a href="./showcourse.html?cid=${data._id}" class="text-success fw-semibold" style="color: #36b913;">view courses</a>
                                </div>
                            </div>
                        </div>
                    `;
                    })

                }else{
                    document.querySelector("#courseNotFound").innerHTML = `Your selected courses will appear here!`;
                }
            })
            .catch(error => {
                console.error('Error fetching course data:', error.message);
            });
    }
}
getcourses()
console.log(isCourse)
const paymnetPay = localStorage.getItem('paymnetPay')
const clearCookiesStoreCourses=()=>{
    if(!paymnetPay){
        const allTemData = localStorage.getItem("newCoursesTem")
         // // Retrieve existing data from LocalStorage
    let existingData = JSON.parse(localStorage.getItem(idCookie)) || [];

    // // Filter out the values to remove
    existingData = existingData.filter(item => !allTemData.includes(item));

    console.log(existingData);
    // // Save the updated data back to LocalStorage
    localStorage.setItem(idCookie, JSON.stringify(existingData));
    localStorage.removeItem('newCoursesTem')
    // let emptyCourses = [];
    axios.post('https://main-server-zeta.vercel.app/courseUpdate', { id: idCookie, courses: existingData })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error('Error', error.message);
        });
    console.log("Updated LocalStorage data:", existingData);
    }
}
  

clearCookiesStoreCourses()
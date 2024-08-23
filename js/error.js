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

document.querySelector("#errorBtn").addEventListener('click', () => {
    // const maxAge = 20 * 365 * 24 * 60 * 60;
    // document.cookie = 'isCourse=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // // localStorage.removeItem('courses')
    // window.location.href = "./index.html"
    const allTemData = localStorage.getItem("newCoursesTem")
    console.log(allTemData)
    deleteFromLocalStorage(allTemData);  // Replace with the value you want to delete




})

// Function to delete a value from LocalStorage based on a match
const deleteFromLocalStorage = (valuesToRemove) => {


    console.log(valuesToRemove);

    // // Retrieve existing data from LocalStorage
    let existingData = JSON.parse(localStorage.getItem(idCookie)) || [];

    // // Filter out the values to remove
    existingData = existingData.filter(item => !valuesToRemove.includes(item));

    console.log(existingData);
    // // Save the updated data back to LocalStorage
    localStorage.setItem(idCookie, JSON.stringify(existingData));
    localStorage.removeItem('newCoursesTem')
    // let emptyCourses = [];
    axios.post('https://main-server-zeta.vercel.app/courseUpdate', { id: idCookie, courses: existingData })
        .then(response => {
            window.location.href = "./index.html"
        })
        .catch(error => {
            console.error('Error', error.message);
            window.location.href = "./index.html"
        });
    window.location.href = "./index.html"
    console.log("Updated LocalStorage data:", existingData);
};

// Usage example



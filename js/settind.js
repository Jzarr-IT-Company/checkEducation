// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) {
//         return parts.pop().split(';').shift();
//     }
// }
// const idCookie = getCookie('id');
// const token = getCookie('token');
// const isCourse = getCookie('isCourse');
// console.log(idCookie)

// document.querySelector("#uploadImage").addEventListener("click",()=>{
//    const fileInput = document.querySelector("#image");
//    if (fileInput.files.length > 0) {
//     const imageFile = fileInput.files[0];
   
//     const formData = new FormData();
//     formData.append('file', imageFile);

//     axios.post('https://images-apis-cklz.vercel.app/upload', formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     })
//         .then(async(response) => {
//             console.log(response.data.url)
//             const image = await response.data.url
//             axios.post('http://localhost:8000/updateImage', {id:idCookie,image})
//             .then(async(response)=>{
//                 console.log(response)
//             })
//             // image = response.data.url;
//         })
//         .catch(error => {
//             console.error('Error uploading image:', error.message, error.code);
//         });
// } else {
//     console.log('No file selected.');
// }
// })
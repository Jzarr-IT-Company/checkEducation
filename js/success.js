document.querySelector("#successBtn").addEventListener('click', () => {
    const maxAge = 20 * 365 * 24 * 60 * 60;
    document.cookie = `isCourse=${true}; path=/; max-age=${maxAge}; Secure; SameSite=Strict`;
    localStorage.removeItem('onlineBuy')
    localStorage.removeItem('buyMore')
    localStorage.removeItem('newCoursesTem')
    window.location.href="./dashboard.html"
})


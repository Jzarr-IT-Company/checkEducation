const stripe = Stripe(window.config.PAYMENT_SECRET_KEY);
const elements = stripe.elements();
const card = elements.create('card');
card.mount('#card-element');
const form = document.getElementById('payment-form');
form.addEventListener('click', async () => {
    // Show loader
    document.getElementById('loader').style.display = 'flex';

    let name = document.querySelector('#fullName').value;
    let email = document.querySelector('#exampleInputEmail1').value;
    let phone = document.querySelector('#phoneNo').value;
    let address = document.querySelector('#address').value;
    let city = document.querySelector('#city').value;
    let state = document.querySelector('#state').value;
    // let postal_code = document.querySelector('#postalCode').value;
    let data = {
        name, email, phone, address, city, state
    }
    // Retrieve the amount from the URL
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const amountParam = urlParams.get('a');

        const amount = amountParam ? amountParam : 2700;
       
        const response = await fetch('https://main-server-zeta.vercel.app/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: amount })
        }).then(res => res.json());
        let secretKey = response.clientSecret;
        const { error, paymentIntent } = await stripe.confirmCardPayment(secretKey, {
            payment_method: {
                card: card,
                billing_details: {
                    name: name.value,
                    email: email.value,
                    phone: phone.value,
                    address: {
                        line1: address.value,
                        line2: address.value,
                        city: city.value,
                        state: state.value,
                        postal_code: postal_code.value
                    }
                }
            }
        });
        if (error) {
            localStorage.clear();
            document.getElementById('loader').style.display = 'none';
            console.error('Payment error:', error.message);
            Swal.fire({
                title: '<strong>Payment failed:</strong>',
                text: error.message,
                icon: 'error',
                customClass: {
                    confirmButton: 'bttn fw-semibold',
                },
                buttonsStyling: false
            }).then((result) => {
                if (result) {
                    window.location.href = "./selecteCourses.html"
                }
            })
        } else if (paymentIntent.status === 'succeeded') {
            axios.post('https://main-server-zeta.vercel.app/addPaymentDetail', { data })
                .then(response => {
                    document.getElementById('loader').style.display = 'none';
                    console.log(response.data.status === 200);
                    Swal.fire({
                        title: 'Payment succeeded!</strong>',
                        icon: 'success',
                        customClass: {
                            confirmButton: 'bttn fw-semibold',
                        },
                        buttonsStyling: false
                    }).then((result) => {
                        if (result) {
                            // const maxAge = 20 * 365 * 24 * 60 * 60; // 20 years in seconds
                            // document.cookie = `isCourse=${true}; path=/; max-age=${maxAge}; Secure; SameSite=Strict`;
                            window.location.href = "./dashboard.html"
                        }
                    })
                        .catch(error => {
                            document.getElementById('loader').style.display = 'none';
                            console.error('Error:', error.response ? error.response.data : error.message);
                        });
                })
        }
    } catch (error) {
        localStorage.clear();
        document.getElementById('loader').style.display = 'none';
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
    }
});


document.getElementById('navigate-btn').addEventListener('click', function() {
    const amount = document.querySelector("#totalFee").innerText;
    window.location.href = `http://localhost:8080?ac=${amount}`;
});

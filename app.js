document.querySelector('#loan-form').addEventListener('submit', calculateResults);

function calculateResults(e) {
    console.log("loading...");
    const loanAmount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const yearsToPay = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(loanAmount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(yearsToPay.value) * 12;

    // Compute monthly payment 
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthy = (principal * x * calculatedInterest) / (x - 1);


    if (isFinite(monthy)) {
        monthlyPayment.value = monthy.toFixed(2);
        totalPayment.value = (monthy * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthy * calculatedPayments) - principal).toFixed(2);
    } else {
        showError('Please check your numbers');
    }
    e.preventDefault();

}

function showError(error) {
    // Create a div
    const errorDiv = document.createElement('div');
    // Get elements 
    const card  = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    // Add a class
    errorDiv.className = 'alert alert-danger';
    // Create text node and append to div 
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
    document.querySelector('.alert').remove();
}
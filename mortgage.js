// this makes sure the script runs only after html has finished loading
document.addEventListener("DOMContentLoaded", function (){
// Initialize the necessary elements
    const mortAmount = document.querySelector("#amount");
    const mortTerm = document.querySelector("#years");
    const intRate = document.querySelector("#rate");
    const mortTypeRepay = document.querySelector("#repay");
    const mortTypeInterest = document.querySelector("#interest");
    const calcButton = document.querySelector("#calc");
    const displayPage = document.querySelector(".right")

    // this makes the code run when the button is clicked
    calcButton.addEventListener("click", function () {
        // reads the user's input and converts it to numbers with parseFloat
        const principal = parseFloat(mortAmount.value);
        const annualRate = parseFloat(intRate.value);
        const years = parseFloat(mortTerm.value);

        //COME BACK TO CARE FOR MISSING INFO, meaning if a field is not entered, write  issing info!!!!!!!!!!!

        if (!principal || !years || !annualRate) {
            displayPage.innerHTML = 
            `<div>
            <p style="color: #d7da2f; font-weight: bolder; font-size: 20px;">Please fill all fields and try again!!!
            </div>`;
            return;
        }

        //introducing parameters in mortgage formula
        let monthlyPayment;
        const monthlyIntRate = annualRate / 12 / 100; //interest per month, to convert annual % to monthly rate

        const months = years * 12;
        
       
        //calculate type of mortgage
        //for repayment mortgage
      if (mortTypeRepay.checked) {
        monthlyPayment = principal * (monthlyIntRate * Math.pow(1 + monthlyIntRate, months) / (Math.pow(1 + monthlyIntRate, months) - 1));

        //for interest only mortgage
       } else if (mortTypeInterest.checked) {
        monthlyPayment = principal * monthlyIntRate;

       }else {
        alert("⚠️⚠️⚠️Please select mortgage type!");
        return;
       }

        //for total repayment
        const totalRepayments = monthlyPayment * years * 12;

        //to show result
        displayPage.innerHTML =
         `<div style="text-align: left; color: white; max-width: 90%">
            <h1 style="color: white;">Your Results</h1>
            <p style="font-size: 0.9rem; color: white; margin-bottom: 20px;">Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>
            
            <div style="border-radius: 10px; padding: 20px; background-color: #0f2a3a; border-top: 2px solid #d7da2f;">
            <p style="font-size: 0.9rem; color: #cfdde5">Your monthly repayments
            <h2 style="font-size: 2rem; margin: 10px, 0; color: #d7da2f;">
            £${monthlyPayment.toFixed(2)}
            </h2>

            <hr style="border: none; border-top: 1px solid #2f4a5c; margin: 15px 0;">

            <p style="font-size: 0.9rem; color: #cfdde5">Total you'll repay over the term
            <h3 style="color: white;">£${totalRepayments.toFixed(2)}</h3>
          </div>
          </div>`;



    });

});


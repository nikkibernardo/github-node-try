const express = require('express');
const app = express();
const port = 8080;

app.get('/loancalculator/:amount/:terms', (req, res) => {
  const loanAmount = parseFloat(req.params.amount);
  const paymentTerms = parseInt(req.params.terms);

  if (isNaN(loanAmount) || isNaN(paymentTerms)) {
    res.status(400).send('Invalid input. Please provide numeric values for Loan Amount and Payment Terms.');
    return;
  }

  const interest = (loanAmount * 0.01 * paymentTerms).toFixed(2);
  const totalAmount = (loanAmount + parseFloat(interest)).toFixed(2);
  const monthlyAmortization = ((loanAmount + parseFloat(interest)) / paymentTerms).toFixed(2);
  const output = `Interest: ${interest}\n<br>Total Amount: ${totalAmount}\n<br>Monthly Amortization: ${monthlyAmortization}`;
  res.send(output);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
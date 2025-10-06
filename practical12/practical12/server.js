const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Function to validate if input is a valid number
function isValidNumber(input) {
    return !isNaN(input) && !isNaN(parseFloat(input)) && isFinite(input);
}

// Function to perform calculations
function calculate(num1, num2, operation) {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    
    switch(operation) {
        case 'add':
            return n1 + n2;
        case 'subtract':
            return n1 - n2;
        case 'multiply':
            return n1 * n2;
        case 'divide':
            if (n2 === 0) {
                throw new Error("Oops! We can't divide by zero! 🤔");
            }
            return n1 / n2;
        default:
            throw new Error("Unknown operation");
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/calculate', (req, res) => {
    const { number1, number2, operation } = req.body;
    
    // Validate inputs
    if (!number1 || !number2) {
        return res.json({
            success: false,
            error: "Please enter both numbers! 📝",
            emoji: "😅"
        });
    }
    
    if (!isValidNumber(number1)) {
        return res.json({
            success: false,
            error: "First number should only contain digits! 🔢",
            emoji: "😊"
        });
    }
    
    if (!isValidNumber(number2)) {
        return res.json({
            success: false,
            error: "Second number should only contain digits! 🔢",
            emoji: "😊"
        });
    }
    
    try {
        const result = calculate(number1, number2, operation);
        
        // Add encouraging messages based on operation
        let message = "";
        let emoji = "🎉";
        
        switch(operation) {
            case 'add':
                message = "Great addition! 🌟";
                emoji = "➕";
                break;
            case 'subtract':
                message = "Super subtraction! 🌟";
                emoji = "➖";
                break;
            case 'multiply':
                message = "Marvelous multiplication! 🌟";
                emoji = "✖️";
                break;
            case 'divide':
                message = "Delightful division! 🌟";
                emoji = "➗";
                break;
        }
        
        res.json({
            success: true,
            result: Number(result.toFixed(6)), // Limit decimal places
            message: message,
            emoji: emoji,
            calculation: `${number1} ${getOperationSymbol(operation)} ${number2} = ${Number(result.toFixed(6))}`
        });
        
    } catch (error) {
        res.json({
            success: false,
            error: error.message,
            emoji: "😅"
        });
    }
});

function getOperationSymbol(operation) {
    switch(operation) {
        case 'add': return '+';
        case 'subtract': return '-';
        case 'multiply': return '×';
        case 'divide': return '÷';
        default: return '?';
    }
}

app.listen(PORT, () => {
    console.log(`🧮 Kids Calculator Server running on http://localhost:${PORT}`);
    console.log(`🎨 Open your browser and start calculating!`);
});

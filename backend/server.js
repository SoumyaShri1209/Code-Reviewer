require('dotenv').config();
const app = require('./src/app')



// app.listen(3000, () => {
//     console.log('Server is running on port http://localhost:3000');
// })



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('APP BARBER WEB');
})

app.listen(3000, () => {
    console.log('Aplicação iniciada na porta 3000!');
})
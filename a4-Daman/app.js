import express from 'express';
import { validatePizza, validateColor } from './my-validators.js';

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Handle the homepage before static files, so index.ejs always renders.
app.get('/', validateColor, (req, res) => {
    res.render('index');
});

app.use(express.static('public'));

app.post('/orders', validatePizza, (req, res) => {
    if (res.locals.errors.length > 0) {
        return res.status(422).render('error');
    }
    res.render('success', {
        yourName: req.body.yourName,
        email: req.body.email
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

import validator from 'validator';

export function validatePizza(req, res, next) {
    res.locals.errors = [];

    // The sauce must match one of the options in the form.
    const sauces = ['tomato', 'alfredo'];
    if (!sauces.includes(req.body.sauce)) {
        res.locals.errors.push({
            field: 'sauce',
            message: 'Please choose either tomato or alfredo'
        });
    }

    // Express sends one checkbox as a string and several as an array.
    const validToppings = [
        'pepperoni', 'ham', 'vegetarian sausage',
        'mushrooms', 'peppers', 'olives'
    ];
    let toppings = req.body.toppings;
    if (toppings === undefined) {
        toppings = [];
    } else if (!Array.isArray(toppings)) {
        toppings = [toppings];
    }
    req.body.toppings = toppings;

    if (toppings.length < 1 || toppings.length > 3) {
        res.locals.errors.push({
            field: 'toppings',
            message: 'Please choose between 1 and 3 toppings'
        });
    }
    if (!toppings.every(topping => validToppings.includes(topping))) {
        res.locals.errors.push({
            field: 'toppings',
            message: 'Please choose only toppings from the list'
        });
    }

    // Remove surrounding spaces before checking the name length.
    if (typeof req.body.yourName !== 'string') {
        req.body.yourName = '';
    }
    req.body.yourName = validator.trim(req.body.yourName);
    if (!validator.isLength(req.body.yourName, { min: 3, max: 30 })) {
        res.locals.errors.push({
            field: 'yourName',
            message: 'Please enter a name between 3 and 30 characters'
        });
    }

    if (typeof req.body.email !== 'string' || !validator.isEmail(req.body.email)) {
        res.locals.errors.push({
            field: 'email',
            message: 'Please enter a valid email address'
        });
    }

    next();
}

export function validateColor(req, res, next) {
    if (typeof req.query.color === 'string' && validator.isHexColor(req.query.color)) {
        res.locals.color = req.query.color;
    } else {
        res.locals.color = '#fffeed';
    }
    next();
}

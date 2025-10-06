const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'library-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.send('<h2>Name is required!</h2><a href="/">Back</a>');
    }
    req.session.user = {
        name,
        loginTime: new Date().toLocaleString()
    };
    res.redirect('/profile');
});

app.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    const { name, loginTime } = req.session.user;
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.get('/session-info', (req, res) => {
    if (!req.session.user) return res.json({ loggedIn: false });
    res.json({ loggedIn: true, ...req.session.user });
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Library portal running on http://localhost:${PORT}`);
});

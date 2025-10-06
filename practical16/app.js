const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    // Basic validation
    if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        return res.redirect('/contact?error');
    }
    // Prepare mail options
    let mailOptions = {
        from: process.env.MAIL_FROM || 'no-reply@example.com',
        to: process.env.MAIL_FROM || 'no-reply@example.com',
        subject: `Portfolio Contact from ${name}`,
        text: message + `\n\nFrom: ${name} <${email}>`
    };

    // Helper that sends using a given transporter and logs transport info
    // label is a short string describing the transporter (e.g. 'Gmail' or 'Ethereal')
    const sendWithTransporter = async (transporter, label = 'SMTP') => {
        const info = await transporter.sendMail(mailOptions);
        console.log(`${label} transport used. MessageId: ${info.messageId}`);
        // If this was an Ethereal account, log the preview URL for convenience
        const preview = nodemailer.getTestMessageUrl(info);
        if (preview) console.log(`${label} preview URL:`, preview);
    };

    try {
        // If MAIL_FROM and MAIL_PASS are provided, use the configured SMTP (Gmail in current setup)
        if (process.env.MAIL_FROM && process.env.MAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAIL_FROM,
                    pass: process.env.MAIL_PASS
                }
            });

            try {
                await sendWithTransporter(transporter, 'Gmail');
                return res.redirect('/contact?success');
            } catch (err) {
                // If authentication failed, fall back to Ethereal for development convenience
                console.error('Primary SMTP send failed — falling back to Ethereal. Error:', err && err.message || err);
                if (err && (err.code === 'EAUTH' || err.responseCode === 535)) {
                    try {
                        let testAccount = await nodemailer.createTestAccount();
                        const ethTransport = nodemailer.createTransport({
                            host: 'smtp.ethereal.email',
                            port: 587,
                            secure: false,
                            auth: {
                                user: testAccount.user,
                                pass: testAccount.pass
                            }
                        });
                        await sendWithTransporter(ethTransport, 'Ethereal');
                        return res.redirect('/contact?success');
                    } catch (ethErr) {
                        console.error('Ethereal fallback failed:', ethErr);
                        let errorMsg = 'Failed to send message via primary SMTP and Ethereal fallback.';
                        return res.redirect('/contact?error=' + encodeURIComponent(errorMsg));
                    }
                }
                // Not an auth problem we handle: rethrow to outer catch
                throw err;
            }
        }

        // Fallback: create an Ethereal test account (development only)
        let testAccount = await nodemailer.createTestAccount();
        const ethTransport = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
    await sendWithTransporter(ethTransport, 'Ethereal');
        return res.redirect('/contact?success');
    } catch (err) {
        console.error('NodeMailer error:', err);
        let errorMsg = 'Failed to send message. Please check your email setup and try again.';
        return res.redirect('/contact?error=' + encodeURIComponent(errorMsg));
    }
});

app.get('/', (req, res) => {
    res.redirect('/contact');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Portfolio website running on http://localhost:${PORT}`);
});

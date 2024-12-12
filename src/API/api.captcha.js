const axios = require('axios');

const RECAPTCHA_SECRET_KEY = 'https://www.google.com/recaptcha/enterprise.js?render=6LctoJkqAAAAAGm710QaLHzq72gSyUe-_p62S522'; // Replace with your secret key

async function verifyCaptcha(captchaResponse) {
    try {
        const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret: RECAPTCHA_SECRET_KEY,
                response: captchaResponse
            }
        });

        return {
            success: response.data.success,
            score: response.data.score,
            error: response.data['error-codes']
        };
    } catch (error) {
        console.error('CAPTCHA verification error:', error);
        return {
            success: false,
            error: ['verification-failed']
        };
    }
}

module.exports = { verifyCaptcha }; 
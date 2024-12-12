class RateLimiter {
    constructor() {
        this.attempts = new Map();
        this.cooldowns = new Map();
    }

    checkAttempt(ip) {
        const now = Date.now();
        const attempts = this.attempts.get(ip) || 0;
        const cooldownUntil = this.cooldowns.get(ip) || 0;

        // Check if in cooldown
        if (now < cooldownUntil) {
            const remainingTime = Math.ceil((cooldownUntil - now) / 1000);
            return {
                allowed: false,
                message: `Please wait ${remainingTime} seconds before trying again.`,
                requiresCaptcha: attempts >= 3
            };
        }

        // Update attempts
        this.attempts.set(ip, attempts + 1);

        // Set cooldown if failed
        if (attempts >= 0) { // Start cooldown from first attempt
            this.cooldowns.set(ip, now + 3000); // 3 second cooldown
        }

        return {
            allowed: true,
            requiresCaptcha: attempts >= 3
        };
    }

    resetAttempts(ip) {
        this.attempts.delete(ip);
        this.cooldowns.delete(ip);
    }
}

module.exports = new RateLimiter(); 
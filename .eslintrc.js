module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": ["babel", "eslint-config-prettier", "eslint:recommended"],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "rules": {
        "no-console":0,
        "no-eval": 1,
        "semi": ["error", "always"],
    }
};

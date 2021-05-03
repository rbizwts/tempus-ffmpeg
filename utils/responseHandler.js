const i18n = require("i18n");

exports.send = (status, code = 200, message, data = "") => {
    return {
        data: data,
        status: i18n.__(status),
        code: code,
        message: i18n.__(message)
    };
}

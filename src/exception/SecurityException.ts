function SecurityException(message, code = 403) {
    this.name = "SecurityException";
    this.message = message;
    this.code = code;
};

SecurityException.prototype = Error.prototype;

export default SecurityException;
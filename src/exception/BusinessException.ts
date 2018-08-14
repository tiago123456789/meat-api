function BusinessException(message) {
    this.name = "BusinessException";
    this.message = message;
};

BusinessException.prototype = Error.prototype;

export default BusinessException;
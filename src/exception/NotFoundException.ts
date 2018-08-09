function NotFoundException(message) {
    this.name = "NotFoundException";
    this.message = message;
};

NotFoundException.prototype = Error.prototype;

export default NotFoundException;
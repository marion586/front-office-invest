const emailValidation = function (string) {
    const regex = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/);
    return regex.test(string);
};

export default emailValidation;

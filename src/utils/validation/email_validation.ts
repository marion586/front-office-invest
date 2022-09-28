const emailValidation = function (string: string): Boolean {
    const regex = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/);
    return regex.test(string);
};

export default emailValidation;

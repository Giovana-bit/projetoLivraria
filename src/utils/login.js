function generateNewPassword() {
    const newPassword = (Math.random() + 1)
    .toString(36)
    .substring(2)
    .replace("J", "@")
    .replace("r", "$")
    .replace("5", "*")
    .replace("y", "#");
    return newPassword;
}

export {generateNewPassword};
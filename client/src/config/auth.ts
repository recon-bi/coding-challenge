interface authPwdSettings {
    passwordLength: number;
    requireUpper: boolean;
    requireLower: boolean;
    requireNumber: boolean;
    requireSpecial: boolean;
}

const pwdSettings: authPwdSettings = {
    passwordLength: 8,
    requireUpper: false,
    requireLower: false,
    requireNumber: false,
    requireSpecial: false,
}

export default pwdSettings;
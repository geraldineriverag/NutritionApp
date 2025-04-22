import { KeyboardTypeOptions } from 'react-native';

export interface SignUpField {
    key: string;
    label: string;
    keyboardType: KeyboardTypeOptions;
    secureTextEntry: boolean;
}

export const signUpFields: SignUpField[] = [
    { key: 'username', label: 'Usuario', keyboardType: 'default', secureTextEntry: false },
    { key: 'email', label: 'Email', keyboardType: 'email-address', secureTextEntry: false },
    { key: 'first_name', label: 'Nombre', keyboardType: 'default', secureTextEntry: false },
    { key: 'last_name', label: 'Apellido', keyboardType: 'default', secureTextEntry: false },
    { key: 'phone', label: 'Teléfono', keyboardType: 'phone-pad', secureTextEntry: false },
    { key: 'birth_date', label: 'Fecha de nacimiento', keyboardType: 'default', secureTextEntry: false },
    { key: 'password', label: 'Contraseña', keyboardType: 'default', secureTextEntry: true },
    { key: 'confirm_password', label: 'Confirmar Contraseña', keyboardType: 'default', secureTextEntry: true },
];

export interface RoleOption {
    label: string;
    value: 'paciente' | 'nutricionista';
}

export const roleOptions: RoleOption[] = [
    { label: 'Paciente', value: 'paciente' },
    { label: 'Nutricionista', value: 'nutricionista' },
];
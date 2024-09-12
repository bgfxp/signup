import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Iconsenha from 'react-native-vector-icons/Ionicons';

export default function App() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showSenha, setShowSenha] = useState(false);
    const [showConfirmSenha, setShowConfirmSenha] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Todos os campos devem ser preenchidos");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("As senhas não coincidem");
            return;
        }

        try {
            const response = await fetch('https://taskhub-s37f.onrender.com/auth/signup', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error('Erro na solicitação: ' + response.statusText);
            }

            const data = await response.json();
            setMensagem("Cadastro realizado com sucesso!");
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        } catch (error) {
            console.error(error);
            setMensagem("Houve um erro ao realizar o cadastro.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Cadastre-Se</Text>
            <View style={styles.inputGroup}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o nome..."
                        value={formData.name}
                        onChangeText={(text) => handleChange('name', text)}
                    />
                    <Icon style={styles.icon} name='user' size={25} color="#333" />
                </View>
            </View>
            <View style={styles.inputGroup}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        placeholder="Digite o email..."
                        value={formData.email}
                        onChangeText={(text) => handleChange('email', text)}
                    />
                    <Icon style={styles.icon} name='mail' size={25} color="#333" />
                </View>
            </View>
            <View style={styles.inputGroup}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite a senha..."
                        value={formData.password}
                        onChangeText={(text) => handleChange('password', text)}
                        secureTextEntry={showSenha}
                    />
                    <TouchableOpacity style={styles.icon} onPress={() => setShowSenha(!showSenha)}>
                        <Iconsenha name={showSenha ? 'eye' : 'eye-off'} color="#333" size={25} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.inputGroup}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirme a senha..."
                        value={formData.confirmPassword}
                        onChangeText={(text) => handleChange('confirmPassword', text)}
                        secureTextEntry={showConfirmSenha}
                    />
                    <TouchableOpacity style={styles.icon} onPress={() => setShowConfirmSenha(!showConfirmSenha)}>
                        <Iconsenha name={showConfirmSenha ? 'eye' : 'eye-off'} color="#333" size={25} />
                    </TouchableOpacity>
                </View>
            </View>
            <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </Pressable>
            {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 15,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333',
    },
    icon: {
        marginLeft: 10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#000',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
    mensagem: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});

import { useContext, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { AuthContext } from '../auth/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    setBusy(true);
    try {
      await login(email, password);
      navigation.replace('Tasks');
    } catch (e) {
      console.error(e);
      Alert.alert('Login failed', e.response?.data?.message || e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Sign in</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address"/>
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title={busy ? 'Signing in...' : 'Sign in'} onPress={onSubmit} disabled={busy} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:'center' },
  h1: { fontSize:24, marginBottom:20, textAlign:'center' },
  input: { height:44, borderWidth:1, borderRadius:6, marginBottom:12, paddingHorizontal:10 }
});

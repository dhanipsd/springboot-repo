import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/auth/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import TaskListScreen from './src/screens/TaskListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Sign In' }} />
          <Stack.Screen name="Tasks" component={TaskListScreen} options={{ title: 'Tasks' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

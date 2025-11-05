import { useContext, useEffect, useState } from 'react';
import { Button, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import api from '../api/apiClient';
import { AuthContext } from '../auth/AuthContext';

export default function TaskListScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { logout } = useContext(AuthContext);

  const fetchTasks = async () => {
    try {
      const r = await api.get('/tasks'); // expects array
      setTasks(r.data);
    } catch (e) {
      console.error('fetchTasks', e);
      // optional: handle 401 -> redirect to login
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.h1}>Tasks</Text>
        <Button title="Logout" onPress={logout} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id || item._id)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{marginTop:20}}>No tasks found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:12},
  headerRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  h1:{fontSize:22,fontWeight:'600'},
  card:{padding:12, marginTop:8, borderWidth:1, borderRadius:8}
});

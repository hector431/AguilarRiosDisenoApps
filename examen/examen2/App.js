import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState(null);
  const url = "https://jsonplaceholder.typicode.com/todos";

  const getData = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setFilteredData(json);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFilterChange = (filterType) => {
    switch (filterType) {
      case 1:
        setFilteredData(data.map(todo => todo.id));
        break;
      case 2:
        setFilteredData(data.filter(todo => todo.completed).map(todo => ({ id: todo.id, title: todo.title })));
        break;
      case 3:
        setFilteredData(data.filter(todo => !todo.completed).map(todo => ({ id: todo.id, title: todo.title })));
        break;
      case 4:
        setFilteredData(data.filter(todo => todo.completed).map(todo => ({ id: todo.id, title: todo.title })));
        break;
      case 5:
        setFilteredData(data.map(todo => ({ id: todo.id, userId: todo.userId })));
        break;
      case 6:
        setFilteredData(data.filter(todo => todo.completed).map(todo => ({ id: todo.id, userId: todo.userId })));
        break;
      case 7:
        setFilteredData(data.filter(todo => !todo.completed).map(todo => ({ id: todo.id, userId: todo.userId })));
        break;
      default:
        setFilteredData(data);
        break;
    }
    setFilterType(filterType);
  };

  const renderItem = ({ item }) => {
    if (typeof item === 'number') {
      return <Text style={styles.item}>{item}</Text>;
    } else {
      return <Text style={styles.item}>{item.id} - {item.title}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NFL ToDo App</Text>
      <View style={styles.buttonContainer}>
        <Button title="Lista de todos los pendientes (solo IDs)" onPress={() => handleFilterChange(1)} />
        <Button title="Lista de todos los pendientes (IDs y Titles)" onPress={() => handleFilterChange(2)} />
        <Button title="Lista de todos los pendientes sin resolver (ID y Title)" onPress={() => handleFilterChange(3)} />
        <Button title="Lista de todos los pendientes resueltos (ID y Title)" onPress={() => handleFilterChange(4)} />
        <Button title="Lista de todos los pendientes (IDs y userID)" onPress={() => handleFilterChange(5)} />
        <Button title="Lista de todos los pendientes resueltos (ID y userID)" onPress={() => handleFilterChange(6)} />
        <Button title="Lista de todos los pendientes sin resolver (ID y userID)" onPress={() => handleFilterChange(7)} />
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    marginTop: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});
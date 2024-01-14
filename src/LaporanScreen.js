import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const LaporanScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    const db = SQLite.openDatabase({ name: 'MyDatabase.db', location: 'default' });

    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS inputs (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT)');
      tx.executeSql('SELECT * FROM inputs ORDER BY id DESC', [], (_, result) => {
        setData(result.rows.raw());
      });
    });
  };

  const clearDatabase = () => {
    const db = SQLite.openDatabase({ name: 'MyDatabase.db', location: 'default' });

    db.transaction((tx) => {
      tx.executeSql('DELETE FROM inputs');
    });

    fetchData(); // Refresh data after clearing the database
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Refresh data when the screen is focused
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.clearButton} onPress={clearDatabase}>
            <Text style={styles.clearButtonText}>Clear Database</Text>
          </TouchableOpacity>
      {data.length === 0 ? (
        <Text>No data available</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>{item.value}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    color: '#43766C'
  },
  clearButton: {
    margin: 10,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LaporanScreen;

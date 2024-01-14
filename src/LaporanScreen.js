import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { openDatabase } from 'react-native-sqlite-storage'
import { useIsFocused } from '@react-navigation/native';

const db = openDatabase({
    name: "rn_sqlite"
})

const LaporanScreen = () => {
    const [categories, setCategories] = useState([]);
    const isFocused = useIsFocused();

    const getCategories = () => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM categories ORDER BY id DESC`,
                [],
                (sqlTxn, res) => {
                    console.log('categories retrieved successfully');
                    let len = res.rows.length;

                    if (len > 0) {
                        let results = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push({ id: item.id, name: item.name });
                        }

                        setCategories(results);
                    }
                },
                error => {
                    console.log('error on getting categories ' + error.message);
                }
            );
        });
    };

    const renderCategory = ({ item }) => {
        return (
            <View style={{ 
                flexDirection: "row",
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderColor: '#ddd'
             }}>
                {/* <Text style={{ marginRight: 9 }}>{ item.id }</Text> */}
                <Text>{ item.name }</Text>
            </View>
        )
    }

    useEffect(() => {
        getCategories();
    }, [isFocused]);


    return (
        <View>
            <Text>Laporan</Text>
            <FlatList data={categories} renderItem={renderCategory} key={cat => cat.id}/>
        </View>
    )
}

export default LaporanScreen;
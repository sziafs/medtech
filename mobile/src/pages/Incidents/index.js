import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

// ja importa no melhor formato de acordo com a tela
import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents(){
        if (loading){
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        } 

        setLoading(true);

        const res = await api.get('incidents', {
            params: { page }
        });

        setIncidents([ ... incidents, ... res.data]);
        setLoading(false);
        setPage(page+1);
        setTotal(res.headers['X-Total-Count']);
    }

    //disparada quando as variaveis mudarem
    useEffect(()=>{
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total of <Text style={styles.headerTextBold}>{total} incidents</Text>
                </Text>
            </View>

            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.description}>Choose one incident from above and save the day.</Text>

            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedTreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentPropery}>NGO</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentPropery}>INCIDENT</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentPropery}>VALUE</Text>
                        <Text style={styles.incidentValue}>{
                            Intl.NumberFormat('en-us', { 
                                    style: 'currency', 
                                    currency: 'USD'
                                }).format(incident.value)}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>See more details</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};
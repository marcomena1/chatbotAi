import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function WelcomeScreen() {
    const navigation = useNavigation();
    return (

        <SafeAreaView style={styles.Safearea} >
            <View style={styles.container}>
                <Text style={styles.nametext}> James </Text>
                <Text style={styles.sectext}> The Future is here,power by AI. </Text>
            </View>
            <View style={styles.imgCont} >
                <Image source={require('../../assets/bot_logo.png')} style={styles.img} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.butcont}>
                <Text style={styles.button}>Get started</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    Safearea: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-around'
    }
    ,
    container: {
        marginTop: 8
    }
    , nametext: {
        textAlign: 'center',
        fontSize: wp(10),
        fontWeight: 'bold',
        color: '#374151',

    },
    sectext: {
        textAlign: 'center',
        letterSpacing: 0.5,
        color: '#4b5563',
        fontWeight: 'semibold',
        fontSize: wp(4)
    },
    img: {
        width: wp(75),
        height: wp(75),
        left: 25
    },
    imgCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    butcont: {
        backgroundColor: '#059669',
        marginHorizontal: 20,
        pading: 16,
        borderRadius: 30,
        height: 55,
        justifyContent: 'center'
    },
    button: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: wp(6)
    }
})
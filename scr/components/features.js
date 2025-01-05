import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Features() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Features</Text>
            <View style={styles.cont2}>
                <View style={styles.imgcont}>
                    <Image source={require('../../assets/chatgpt-logo.jpg')} style={{ height: hp(4), width: hp(4) }} />
                    <Text style={styles.sechead}> ChatGPT </Text>
                </View>
                <Text style={styles.sectext}>ChatGPT can comprehend and respond to a wide range of text inputs in various formats </Text>
            </View>
            <View style={styles.cont3}>
                <View style={styles.imgcont}>
                    <Image source={require('../../assets/dall-e.jpg')} style={{ height: hp(4), width: hp(4) }} />
                    <Text style={styles.sechead}> DALL-E </Text>
                </View>
                <Text style={styles.sectext}>DALL·E is an image generation model developed by OpenAI, capable of creating  original images from text descriptions.  </Text>
            </View>
            <View style={styles.cont4}>
                <View style={styles.imgcont}>
                    <Image source={require('../../assets/smart-ai.jpg')} style={{ height: hp(4), width: hp(4) }} />
                    <Text style={styles.sechead}> Smart AI </Text>
                </View>
                <Text style={styles.sectext}>Smart AI is a broad term used to describe artificial intelligence systems that are capable of performing tasks</Text>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        height: hp(60)
    },
    text: {
        fontWeight: 'semibold',
        fontSize: wp(8),
        color: '#4B5563',
        margin: 10
    },
    cont2: {
        backgroundColor: '#A7F3D0',
        padding: 16,
        borderRadius: 12,
        display: 'flex',
        marginBottom: 8
    },
    cont3: {
        backgroundColor: '#D6BCFA',
        padding: 16,
        borderRadius: 12,
        display: 'flex',
        marginBottom: 8
    },
    cont4: {
        backgroundColor: '#80E0E0',
        padding: 16,
        borderRadius: 12,
        display: 'flex',
        marginBottom: 8
    },
    imgcont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 4,
        marginBottom: 10
    },
    sechead: {
        fontSize: wp(4.8),
        fontWeight: 'semibold',
        color: '#4B5563'

    },
    sectext: {
        fontSize: wp(4),
        color: '#4B5563',
        fontWeight: 'medium'

    }
})
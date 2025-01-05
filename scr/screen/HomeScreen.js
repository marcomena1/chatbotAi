import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Voice from 'react-native-community/voice'
import Features from '../components/features';
import { dummyMasseges } from '../constans';
import { apiCall } from '../api/openAi';

export default function HomeScreen() {
    const [massseges, setMassseges] = useState(dummyMasseges);
    const [recording, setRecording] = useState(false);
    const [speaking, setSpeaking] = useState(true);
    const [result, setResult] = useState('');

    const speechStartHandler = e => {
        console.log('speech start handler');
    }
    const speechEndHandler = e => {
        setRecording(false)
        console.log('speech end handler')
    }
    const speechResultsHandler = e => {
        console.log('voice event:', e)
        const text = e.value[0]
        setResult(text);
    }
    const speechErrorHandler = e => {
        console.log('speech error handler:', e)
    }





    useEffect(() => {
        Voice.onSpeechResults = (event) => {
            setRecognizedText(event.value[0]);
        };
        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const clear = () => {
        setMassseges({});
    }
    const StartRecording = () => {
        setMassseges({});
    }
    const StopRecording = async () => {
        try {
            await VideoColorSpace.Stop();
            setSpeaking(false);
            fetchResponse();

        } catch (error) {
            console.log('error:', error)
        }


    }
    const stopSpeaking = async () => {
        setSpeaking(false);
    }

    const fetchResponse = () => {
        if (resourceLimits.trim().length > 0) {
            let newMessages = [...messages];
            newMessages.push({ role: 'user', content: resourceLimits.trim() });

            // Update the state with the new user message
            setMessages([...newMessages]);

            // Call the API with the updated messages
            apiCall(resourceLimits.trim(), newMessages).then((res) => {
                if (res.success) {
                    setMessages([...res.data]); // Assuming res.data contains the updated conversation
                    setResult(''); // Clear the input field or result
                } else {
                    Alert.alert('Error', res.msg); // Show an error alert
                }
            });
        }
    };


    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/bot_logo.png')} style={styles.logo} />
                </View>

                {/* Conditional rendering based on messages */}
                {massseges.length > 0 ? (
                    <View style={styles.messagesContainer}>
                        <Text style={styles.assistantLabel}>Assistant</Text>
                        <View style={styles.chatContainer}>
                            <ScrollView
                                bounces={false}
                                style={styles.scrollView}
                                showsHorizontalScrollIndicator={false}
                            >
                                {massseges.map((message, index) => {
                                    if (message.role === 'assistant') {
                                        if (message.content.includes('https')) {
                                            // Assuming the message contains an image URL
                                            return (
                                                <View key={index} style={styles.imageContainer}>
                                                    <View style={styles.imageMessageContainer}>
                                                        <Image
                                                            source={{ uri: message.content }}
                                                            style={styles.imageMessage}
                                                            resizeMode="contain"
                                                        />
                                                    </View>

                                                </View>
                                            );
                                        } else {
                                            // Text response from the assistant
                                            return (
                                                <View key={index} style={styles.textMessageContainer}>
                                                    <Text>{message.content}</Text>
                                                </View>
                                            );
                                        }
                                    } else {
                                        // User input
                                        return (
                                            <View key={index} style={styles.userMessageContainer}>
                                                <View style={styles.userMessage}>
                                                    <Text>{message.content}</Text>
                                                </View>
                                            </View>
                                        );
                                    }
                                })}
                            </ScrollView>
                        </View>
                    </View>
                ) : (
                    <Features />
                )}
                <View style={styles.miccontainer}>
                    {
                        recording ? (
                            <TouchableOpacity onPress={StopRecording}>
                                <Image source={require('../../assets/recording-icon.gif')} style={styles.recicon} />
                            </TouchableOpacity>
                        ) : (

                            <TouchableOpacity on onPress={StartRecording}>
                                <Image source={require('../../assets/mic.png')} style={styles.recicon} />
                            </TouchableOpacity>
                        )
                    }
                    {
                        massseges.length > 0 && (
                            <TouchableOpacity onPress={clear} style={styles.clearbut} >
                                <Text  >Clear</Text>
                            </TouchableOpacity>
                        )
                    }
                    {
                        speaking && (
                            <TouchableOpacity onPress={stopSpeaking} style={styles.rectext} >
                                <Text  >Stop</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    safeArea: {
        flex: 1,
        marginHorizontal: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo: {
        height: hp(15),
        width: hp(15),
        left: 15,
    },
    messagesContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        marginBottom: 50,
        fontSize: 18,
    },
    assistantLabel: {
        fontSize: wp(5),
        color: '#4B5563',
        fontWeight: 'semibold',
        marginLeft: 4,
    },
    chatContainer: {
        height: hp(58),
        backgroundColor: '#F3F4F6',
        borderRadius: 24,
        padding: 16,
    },
    scrollView: {
        marginBottom: 10,
    },
    textMessageContainer: {
        padding: 10,
        backgroundColor: '#D1FAE5',
        borderRadius: 20,
        borderTopLeftRadius: 0,
        width: wp(70),
        marginBottom: 20,
    },
    userMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    userMessage: {
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderTopRightRadius: 0,
        width: wp(70),
        marginBottom: 10,
    },
    imageMessageContainer: {

        backgroundColor: '#D1FAE5',
        borderRadius: 16,
        borderTopLeftRadius: 0,
        height: wp(70),
        marginBottom: 20,
    },
    imageMessage: {
        width: wp(70),
        height: wp(70),
        borderRadius: 16,
        objectFit: 'cover',
        padding: 10,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    miccontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10
    },
    recicon: {
        width: hp(8),
        height: hp(8),
        borderRadius: 9999
    },
    clearbut: {
        backgroundColor: '#A3A3A3',
        borderRadius: 24,
        padding: 8,
        position: 'absolute',
        right: 40,
    },
    rectext: {
        backgroundColor: '#F87171',
        borderRadius: 24,
        padding: 8,
        position: 'absolute',
        left: 40,
    }

});
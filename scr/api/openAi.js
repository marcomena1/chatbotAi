import axios from 'axios';
const { apiKey } = require("../constans");

const client = axios.create({
    headers: {
        "Authorization": `Bearer ${apiKey}`, // Fixed Authorization header format
        "Content-Type": "application/json"
    }
});

const chatGptEndpoint = 'https://api.openai.com/v1/chat/completions';
const dalleEndpoint = 'https://api.openai.com/v1/images/generations';

export const apiCall = async (prompt, messages,) => {
    try {
        const res = await client.post(chatGptEndpoint, {
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: `Does this message want to generate an AI picture, image, art, or anything similar? ${prompt}. Simply answer with a yes or no.`
            }]
        });

        //console.log('data:', response.data); // Corrected the variable name to 'response'

        let isArt = res.data?.choices[0]?.message?.content;
        if (isArt.toLowerCase().include('yes')) {
            console.log('dalle api call')
            return dalleApiCall(prompt, messages || [])
        } else {
            console.log('chat gpt api call')
            return chatgptApiCall(prompt, messages || [])
        }
    } catch (err) {
        console.log('error:', err);
        return Promise.resolve({ success: false, msg: err.message })

    }
};

const chatgptApiCall = async (prompt, message) => {
    try {
        // Assuming `client` is set up to make the HTTP request
        const res = await client.post(chatGptEndpoint, {
            model: 'gpt-3.5-turbo',
            messages: [
                ...message, // assuming you want to send the existing message history
                { role: 'user', content: prompt } // add the new user prompt
            ]
        });

        // Extracting the response from the API
        let answer = res.data?.choices[0]?.message?.content;
        if (answer) {
            message.push({ role: 'assistant', content: answer.trim() });
            return Promise.resolve({ success: true, msg: answer.trim() });
        } else {
            throw new Error("No answer returned from the API.");
        }
    } catch (err) {
        console.log('error:', err);
        return Promise.resolve({ success: false, msg: err.message });
    }
};

const dalleApiCall = async (prompt, messages) => {
    try {
        const res = await client.post(dalleEndpoint, {
            prompt,
            n: 1,
            size: "512x512"
        })
        let url = res?.data?.data[0]?.url;
        console.log('got url of image :"url');
        messages.push({ role: 'assistant', content: url });
        return Promise.resolve({ success: true, data: messages });
    } catch (err) {
        console.log('error:', err);
        return Promise.resolve({ success: false, msg: err.message });
    }
}

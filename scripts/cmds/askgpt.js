const axios = require('axios');

// Load OpenAI API key from environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

module.exports = {
    name: 'askgpt', // The command name
    description: 'Ask GPT-4 a question', // Description of the command
    prefix: '#', // The prefix to trigger the command, if needed
    
    // Main function to handle the command execution
    execute: async function ({ event, api, args }) {
        const userPrompt = args.join(' '); // Join the arguments to form the user’s prompt

        // Make sure a prompt was provided
        if (!userPrompt) {
            return api.sendMessage('Please provide a prompt for GPT-4.', event.threadID);
        }

        try {
            const response = await getGPT4Response(userPrompt);
            api.sendMessage(response, event.threadID); // Send GPT-4 response to the user
        } catch (error) {
            api.sendMessage('Error fetching response from GPT-4.', event.threadID);
            console.error('GPT-4 API error:', error);
        }
    }
};

// Function to call GPT-4 API
async function getGPT4Response(prompt) {
    const url = 'https://api.openai.com/v1/chat/completions';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
    };

    const data = {
        model: 'gpt-4',  // Specify GPT-4 model
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,  // You can adjust this
        temperature: 0.7, // Adjust for creativity
    };

    const response = await axios.post(url, data, { headers });
    return response.data.choices[0].message.content.trim();
}

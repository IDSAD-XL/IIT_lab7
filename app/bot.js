// bot.js
require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');

const axios = require('axios');

// Replace with your Logstash endpoint URL
const logstashEndpoint = 'http://logstash:8080';

// Log a message
const logMessage = async (message) => {
  try {
    console.log("Trying to send request");
    const responce = await axios.post(logstashEndpoint, {
      message: message
    });
    console.log(responce);
  } catch (error) {
    console.error('Error sending log to Logstash:', error);
  }
};

// Replace with your Telegram Bot API token
const token = process.env.BOT_TOKEN;

// Create a new bot instance
const bot = new TelegramBot(token, { polling: true });
// Start listening for incoming messages
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const message = `Received message from ${msg.from.username}: ${msg.text}`;

  // Log the message
  await logMessage(message);

  // Reply to the user
  bot.sendMessage(chatId, 'Message received!');
});

console.log('Bot is running...');

// Handle Ctrl+C to gracefully stop the bot
process.on('SIGINT', () => {
  console.log('Bot stopped.');

  // Stop listening for incoming messages
  bot.stopPolling();
});

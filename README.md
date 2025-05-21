# Mental Health Support Chatbot

A web-based mental health support chatbot that leverages YouTube content to provide helpful responses and support to users. The chatbot uses AI to process and respond to user queries about mental health topics.

## Architecture

The project follows a client-server architecture with the following components:

### Backend
- **Node.js/Express Server**: Handles API requests and serves the web application
- **OpenAI Integration**: Powers the chatbot's natural language processing capabilities
- **YouTube Transcript API**: Fetches and processes content from YouTube videos
- **EJS Templating**: Server-side rendering for dynamic web pages

### Frontend
- **Web Interface**: User-friendly chat interface
- **Static Assets**: CSS, JavaScript, and other static files served from the public directory

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- OpenAI API key
- YouTube API credentials (if needed)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
OPENAI_API_KEY=your_openai_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

## Usage

1. Start the development server:
```bash
npm run dev
```

2. For production:
```bash
npm start
```

3. Access the application at `http://localhost:3001`

## Project Structure

```
chatbot/
├── src/              # Source code
├── public/           # Static assets
├── views/            # EJS templates
├── mental-health-bot/# Bot-specific code
├── server.js         # Main server file
├── package.json      # Project dependencies
└── README.md         # Project documentation
```

## Features

- Real-time chat interface
- AI-powered responses based on mental health content
- YouTube content integration
- Timezone-aware timestamps
- Responsive web design

## Dependencies

- express: Web framework
- ejs: Templating engine
- openai: OpenAI API integration
- youtube-transcript: YouTube content processing
- cors: Cross-origin resource sharing
- dotenv: Environment variable management
- moment: Date/time handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the repository or contact the maintainers.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { OpenAI } = require('openai');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
const port = process.env.PORT || 3001;

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Store for processed YouTube content
let knowledgeBase = [];

// Process YouTube content
async function processYouTubeContent(videoId) {
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        const transcriptText = transcript.map(item => item.text).join(' ');
        
        // Process transcript with OpenAI to extract key information
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Extract key mental health advice and information from this transcript. Format as a list of key points and insights. Include specific quotes or examples from the video when relevant."
                },
                {
                    role: "user",
                    content: transcriptText
                }
            ]
        });

        const processedContent = response.choices[0].message.content;
        
        // Add to knowledge base with metadata
        knowledgeBase.push({
            videoId,
            content: processedContent,
            timestamp: new Date().toISOString(),
            summary: processedContent.split('\n').slice(0, 3).join('\n') // First 3 lines as summary
        });

        return {
            success: true,
            summary: processedContent.split('\n').slice(0, 3).join('\n'),
            totalVideos: knowledgeBase.length
        };
    } catch (error) {
        console.error('Error processing YouTube content:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Routes
app.get('/', (req, res) => {
    // Pass the processed videos to the template
    const processedVideos = knowledgeBase.map(video => ({
        id: video.videoId,
        summary: video.summary,
        timestamp: video.timestamp
    }));
    
    res.render('index', { 
        processedVideos: processedVideos || [] // Ensure it's always an array
    });
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        // Get response from OpenAI with context from processed videos
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a mental health support chatbot. Use the following knowledge base from processed videos to inform your responses: ${JSON.stringify(knowledgeBase)}. 
                    Always:
                    1. Reference specific points from the videos when relevant
                    2. Include appropriate disclaimers
                    3. Encourage professional help when needed
                    4. If the question is not related to the video content, say so and provide general guidance`
                },
                {
                    role: "user",
                    content: message
                }
            ]
        });

        res.json({
            response: response.choices[0].message.content,
            hasVideoContext: knowledgeBase.length > 0
        });
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/process-video', async (req, res) => {
    try {
        const { videoId } = req.body;
        const result = await processYouTubeContent(videoId);
        
        if (result.success) {
            res.json({ 
                message: `Video processed successfully! Extracted ${result.totalVideos} key points.`,
                summary: result.summary
            });
        } else {
            res.status(400).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error processing video:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 
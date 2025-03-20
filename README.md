
# AI Medical Collaboration Platform

This platform enables healthcare professionals to collaborate with AI medical specialists for patient diagnosis and treatment recommendations. The application leverages Supabase for backend functionality and Gemini AI for generating medical insights.

![AI Medical Platform](https://lovable.dev/projects/aa578b3b-4cba-47c3-ac6c-85204b5045c1)

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [User Flow](#user-flow)
4. [Data Flow](#data-flow)
5. [AI Models](#ai-models)
6. [Key Features](#key-features)
7. [Technical Components](#technical-components)
8. [Setup and Development](#setup-and-development)
9. [Edge Functions](#edge-functions)

## Overview

The AI Medical Collaboration Platform is designed to assist healthcare professionals by providing AI-powered diagnostics and recommendations from multiple specialized AI agents. Doctors can describe patient symptoms, consult with AI specialists, and receive detailed diagnoses and treatment plans. The platform enables multi-agent collaboration where AI specialists from different fields can work together on complex cases.

## Architecture

The application follows a modern React architecture with:

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: Supabase for data storage, authentication, and Edge Functions
- **AI Integration**: Gemini AI via Supabase Edge Functions

### Key Components:

1. **Agent System**: AI medical specialists with different specialties
2. **Collaboration System**: Multi-agent diagnostic collaboration
3. **Chat Interface**: Direct communication with individual AI specialists
4. **Patient Records**: Management of patient information
5. **Analytics**: Usage and diagnostic statistics

## User Flow

### Authentication Flow
1. User registers or logs in through the Login/Register pages
2. Authentication is handled via Supabase
3. Protected routes redirect unauthenticated users to the login page

### Main Application Flows

#### Individual Agent Consultation
1. Navigate to the Agents page
2. Select an AI specialist (e.g., CardioAssist for cardiology)
3. Enter patient symptoms or use the dropdown selectors
4. View the AI-generated diagnosis and recommendations
5. Continue the conversation with follow-up questions

#### Collaborative Consultation
1. Navigate to the Collaboration page
2. Select multiple AI specialists to consult with (e.g., cardiologist, neurologist)
3. Enter patient symptoms and start the consultation
4. Each AI specialist analyzes the case and provides their perspective
5. View all diagnoses in the conversation tab
6. Switch to the verdict tab to see a summary of all diagnoses
7. Ask follow-up questions to further clarify the diagnosis

#### Follow-up Scheduling
1. Navigate to the Follow-up Scheduler
2. Select a patient and an AI specialist
3. Specify the condition and follow-up date
4. The system automatically generates relevant follow-up questions
5. Schedule the follow-up appointment

## Data Flow

### Consultation Data Flow

1. **Initialization**
   - User inputs symptoms and selects specialists
   - A new consultation is created in the `ai_consultations` table

2. **Message Processing**
   - User messages are stored in the `ai_consultation_messages` table
   - Messages are sent to AI specialists via the Edge Function

3. **AI Response Generation**
   - The `generate-medical-response` Edge Function processes the symptoms
   - The function uses Gemini AI to generate specialist-specific responses
   - Responses are parsed for diagnosis, confidence, and recommendations

4. **Diagnosis Storage and Presentation**
   - Diagnoses are stored in the application state
   - Diagnoses are displayed in the UI with confidence levels
   - The collective verdict is presented as a summary

### Individual Agent Chat Flow

1. User selects an agent and inputs a query
2. Query is sent to the `generate-medical-response` Edge Function
3. Gemini AI generates a response based on the agent's specialty
4. Response is displayed in the chat interface
5. Chat history is maintained in the local state

## AI Models

The platform uses Google's Gemini AI models for medical response generation:

- **Model**: Gemini 2.0 Flash
- **Integration**: Via Supabase Edge Functions
- **Prompt Engineering**: Specialized prompts based on medical specialties
- **Response Parsing**: Extracts diagnosis, confidence, and recommendations

### AI Prompt Engineering

The application uses specialty-specific prompts to guide the AI models:

```
You are a medical AI assistant specializing in [SPECIALTY].
Based on your expertise, analyze the following patient symptoms and provide:
1. A diagnosis with explanation
2. A confidence percentage (70-99%)
3. Treatment recommendations from your specialty's perspective
```

The system parses the AI responses to extract structured information using pattern recognition and text analysis.

## Key Features

### Multi-Agent Collaboration
- Select multiple specialists for complex cases
- Each specialist provides their perspective based on their expertise
- Aggregated view of all diagnoses with confidence levels

### Specialty-Specific AI Agents
- Cardiology (CardioAssist)
- Neurology (NeuroLogic)
- Pathology (PathInsight)
- General Medicine (GeneralMD)
- Ophthalmology (OptiVision)
- Radiology (RadAnalytics)
- Pharmacology (PharmExpert)

### Interactive Chat Interface
- Real-time communication with AI specialists
- Dropdown selectors for patient information and symptoms
- Add-to-chat functionality for template-based queries

### Follow-up Management
- Schedule follow-up appointments
- Auto-generated follow-up questions based on conditions
- Integration with patient records

### Analytics Dashboard
- Patient statistics
- Consultation metrics
- Treatment distribution
- Condition tracking

## Technical Components

### Frontend Components

#### Agent System
- `AgentSelector.tsx`: Allows selection of an AI specialist
- `AgentProfile.tsx`: Displays specialist information
- `ChatInterface.tsx`: Main chat interface for agent communication
- `agentsData.ts`: Data about available AI specialists

#### Collaboration System
- `CollaborativeConsultation.tsx`: Main collaboration interface
- `ConsultationSetup.tsx`: Setup for collaborative consultations
- `ConsultationChat.tsx`: Chat interface for collaborative sessions
- `DiagnosisVerdict.tsx`: Displays aggregated diagnoses

#### UI Components
- `ChatInput.tsx`: Message input interface
- `ChatMessage.tsx`: Message display component
- `DropdownSelectors.tsx`: Dropdown menus for data selection

### Backend Services

#### Authentication Services
- Supabase Authentication
- `AuthContext.tsx`: Context provider for authentication state
- `ProtectedRoute.tsx`: Route protection for authenticated users

#### Data Services
- `consultationService.ts`: Handles consultation data
- `agentService.ts`: Manages agent interactions
- Supabase tables for storing consultation data

### State Management
- React Hooks for local component state
- Custom hooks for shared functionality
- Context API for global state

## Setup and Development

### Prerequisites
- Node.js & npm
- Supabase account

### Local Development

```sh
# Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Install the necessary dependencies.
npm i

# Start the development server.
npm run dev
```

### Project Structure

```
src/
├── components/
│   ├── agents/           # Individual agent consultation
│   ├── analytics/        # Analytics dashboard
│   ├── collaboration/    # Multi-agent collaboration
│   ├── followup/         # Follow-up scheduling
│   ├── layout/           # Layout components
│   ├── patients/         # Patient management
│   ├── settings/         # User settings
│   └── ui/               # UI components (shadcn/ui)
├── contexts/             # Context providers
├── hooks/                # Custom hooks
├── integrations/
│   └── supabase/         # Supabase client
├── lib/                  # Utility functions
├── pages/                # Page components
└── App.tsx               # Main application component
```

## Edge Functions

The application uses Supabase Edge Functions for AI integration:

### generate-medical-response
This function handles AI-generated medical responses by:
1. Receiving symptoms and specialist information
2. Constructing a specialized prompt based on the medical field
3. Calling the Gemini AI API
4. Parsing the response for diagnosis, confidence, and recommendations
5. Returning structured data to the frontend

```typescript
// Main prompt construction
let promptText = `You are a medical AI assistant`;
if (specialty) {
  promptText += ` specializing in ${specialty}`;
}

if (isCollaborative) {
  promptText += `. You are participating in a collaborative consultation with other AI specialists. 
  Based on your expertise${specialty ? ` in ${specialty}` : ''}, analyze the following patient symptoms and provide:
  1. A diagnosis with explanation
  2. A confidence percentage (70-99%)
  3. Treatment recommendations from your specialty's perspective
  
  Be precise and focused on your area of expertise. Your analysis will be combined with other specialists.`;
}
```

### generate-followup-questions
This function generates relevant follow-up questions based on a medical condition by:
1. Receiving the condition and optionally a specialty
2. Creating a prompt for generating appropriate follow-up questions
3. Calling the Gemini AI API
4. Parsing the response into a list of questions
5. Returning the questions to the frontend

---

## Getting Started

To get started with the application:

1. Create an account or log in
2. Navigate to the Agents page to consult with individual specialists
3. Use the Collaboration page for complex cases requiring multiple specialists
4. Schedule follow-ups as needed
5. Review analytics for insights into your practice

## Deployment

Deploy the application using your preferred hosting provider. The application can be easily deployed with platforms like Netlify, Vercel, or directly from GitHub.

For detailed deployment instructions, visit: [https://docs.lovable.dev/tips-tricks/custom-domain/](https://docs.lovable.dev/tips-tricks/custom-domain/)

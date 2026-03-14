🚀 TruthStorm AI – Viral Content Investigation Platform

Welcome to TruthStorm AI, a full stack web application designed to help users investigate viral content and detect misleading information.

The platform analyzes images, captions, and sources using AI-powered analysis and provides an investigation report showing credibility and original context.

📌 Problem Statement

In today’s digital world, misinformation spreads extremely fast, especially on social media platforms.

Often, real images are shared with misleading captions or false context, causing confusion and spreading incorrect narratives.

Examples include:

Old disaster images shared as recent events

Images from one country shared as another location

Misleading headlines attached to real images

Currently, most users lack simple tools to verify viral content quickly.

TruthStorm AI aims to solve this problem by providing a web-based investigation platform that allows users to analyze viral content and detect potential misinformation.

🎯 Event Objective

The goal of this project is to build a complete full stack application that:

Detects potentially misleading viral content

Investigates the origin of images and captions

Generates an AI-based credibility score

Displays results through an intuitive dashboard

Participants must design and implement the solution using modern full stack technologies.

🛠 Required Tech Stack

The application will be built using the following technologies.

Frontend

ReactJS

Tailwind CSS

Backend

Node.js

Express.js

Database

MongoDB

🧠 Core System Features

TruthStorm AI includes several investigation modules to analyze viral content.

1️⃣ Image Verification

The system analyzes uploaded images and attempts to determine their original context.

Features include:

Detect reused images

Identify original image sources

Reverse image search integration

2️⃣ Caption & Claim Analysis

The system evaluates captions or headlines attached to viral images.

It performs:

Natural language analysis

Detection of misleading language

Credibility scoring

3️⃣ Viral Threat Radar

TruthStorm AI also monitors suspicious viral content patterns.

This module:

Detects trending misinformation

Flags suspicious viral claims

Highlights potentially misleading content

4️⃣ Investigation Report

After analysis, the system generates a complete investigation report including:

Credibility score

Original image context

Caption analysis results

Final misinformation probability

⚙️ Application Architecture

The application follows a layered architecture:

User Upload
     ↓
Frontend Dashboard (React + Tailwind)
     ↓
Backend API (Node.js + Express)
     ↓
AI Content Analysis
     ↓
Truth Engine
     ↓
MongoDB Database
     ↓
Investigation Dashboard
📋 Mandatory Full Stack Features

The application will also implement several core full stack features.

1️⃣ Routing & Navigation

Client-side routing using React Router.

Pages include:

Home

Login

Signup

Dashboard

Investigation Results

User Profile

2️⃣ React Hooks Usage

The application demonstrates usage of key React hooks:

useState – manage component state

useEffect – handle API calls and lifecycle events

useRef – DOM references and focus control

useContext – global state sharing

3️⃣ State Management

Global application state will be managed using:

Context API

Used for:

Authentication state

User preferences

Investigation results

4️⃣ Authentication System

Basic authentication functionality includes:

Signup page

Login page

Password validation

LocalStorage session handling

Protected routes for authenticated users

5️⃣ Theme Support

TruthStorm AI will support:

Dark mode

Light mode

Theme toggle option

Persisted theme preference

6️⃣ Search, Filtering & Sorting

Users will be able to:

Search investigation results

Filter by credibility score

Sort by date or relevance

7️⃣ Debouncing

Debouncing will be implemented in search features to prevent excessive API requests while typing.

8️⃣ Pagination

Large datasets will be displayed using pagination.

Examples:

Investigation reports

Viral threat radar results

Pagination will use:

MongoDB limit and skip

Frontend pagination UI

9️⃣ CRUD Operations

The platform will support full CRUD functionality.

Users can:

Create investigation requests

Read investigation reports

Update saved investigations

Delete investigation history

🔟 API Integration

REST APIs will be built using Node.js and Express.

Features include:

structured API endpoints

error handling

loading states

1️⃣1️⃣ Form Handling & Validation

Forms will include:

Input validation

Error handling

User feedback

Controlled React components

1️⃣2️⃣ Responsive UI

The UI will be fully responsive using Tailwind CSS, supporting:

Desktop

Tablet

Mobile devices

1️⃣3️⃣ Error Handling

The system will implement robust error handling.

Examples include:

Backend API error responses

Frontend error display

Try–catch blocks for API calls

🎯 Expected Outcome

The final result will be a fully functional full stack web application capable of:

Investigating viral content

Detecting misleading images and captions

Generating credibility reports

Providing an intuitive investigation dashboard

TruthStorm AI aims to empower users to verify information before sharing it online, helping reduce the spread of misinformation.
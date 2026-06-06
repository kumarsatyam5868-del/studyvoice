<div align="center">
  
  <h1>🎙️ StudyVoice</h1>
  <p><strong>A zero-friction, voice-powered task & note manager built for students.</strong></p>

  <a href="[ https://studyvoice.vercel.app/ ]">
    <img src="https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />

  <br />
  <br />

  <video src="[ https://github.com/user-attachments/assets/c5623f3c-5349-4fa9-b974-02aeb93eebed ]" width="250" controls autoplay loop muted></video>

  <p><i>Watch the 30-second demo to see the Web Speech API in action!</i></p>

</div>

<br />

<hr />

## 💡 The Vision
Most students spend years consuming technology; very few take the leap to build it. **StudyVoice** was built during the Open Source Hackathon to solve a real, everyday problem: **Idea Friction.**

Students frequently get brilliant ideas or remember urgent tasks while walking, commuting, or studying. However, unlocking a phone, finding an app, and typing breaks focus. StudyVoice eliminates this friction entirely.

## 🎯 Target Audience
* **University Students:** For hands-free lecture logging and assignment tracking.
* **Neurodivergent Thinkers:** For rapid "brain dumping" without complex UI distractions.
* **Commuters:** For capturing thoughts safely while walking or on transit.
* **Language Learners:** For testing pronunciation clarity via real-time speech-to-text.

## 🚀 Key Features
* ⚡ **Absolute Zero Friction:** No accounts, no login screens, no loading states.
* 🗣️ **Native Web Speech API:** Real-time voice-to-text conversion natively in the browser without paid AI APIs.
* 💾 **Offline-First Architecture:** All data is stored instantly in device `localStorage`.
* 🗂️ **Smart Sorting:** One-tap routing to either actionable "Tasks" (with checkboxes) or static "Notes".
* 📱 **Mobile Optimized:** Designed specifically to look, feel, and act like a native Android/iOS application.

## 🛠️ Technical Stack
<table>
  <tr>
    <td><strong>Frontend</strong></td>
    <td>React.js (via Vite)</td>
  </tr>
  <tr>
    <td><strong>Styling</strong></td>
    <td>Tailwind CSS v4</td>
  </tr>
  <tr>
    <td><strong>Engine</strong></td>
    <td>HTML5 Web Speech API (window.SpeechRecognition)</td>
  </tr>
  <tr>
    <td><strong>Storage</strong></td>
    <td>Browser Local Storage (JSON Parsed)</td>
  </tr>
  <tr>
    <td><strong>Deployment</strong></td>
    <td>Vercel (CI/CD)</td>
  </tr>
</table>

## 💻 Run it Locally
Want to test or contribute to the code? It takes less than a minute to spin up.

```bash
# 1. Clone the repository
git clone [https://github.com/kumarsatyam5868-del/studyvoice.git](https://github.com/kumarsatyam5868-del/studyvoice.git)

# 2. Enter the directory
cd studyvoice

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# 🧠 What-If Generator

An AI-powered tool that generates alternate history timelines based on any news article or historical event, visualized with an interactive D3.js graph.  
Zoom, Pan, Drag, Export build your own alternate realities!

---

## ✨ Features

- 🧠 Smart Generative AI (powered by GPT-4) creates logical "What If" alternate events
- 📈 Interactive D3.js Timeline visualization
- 🔍 Zoom, Pan, and Drag timeline events
- 🎨 Node colors based on event impact (High, Medium, Low)
- 🎛️ Impact Strength Slider to filter events
- 📄 Multiple timeline versions side-by-side
- 📷 Export timeline as PNG image
- 🚀 Full React.js + Node.js architecture

---

## 🛠 Tech Stack

| Layer        | Technology                  |
|--------------|------------------------------|
| Frontend     | React.js, Bootstrap, D3.js    |
| Backend      | Node.js, Express.js, OpenAI SDK |
| AI Model     | GPT-4 (via OpenAI API)         |
| Styling      | React-Bootstrap + Custom CSS  |

---

## 📂 Project Structure

```

what-if-generator/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── App.css
│   ├── package.json
│
├── README.md
└── .gitignore

````

---

## 🚀 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Nuraj250/what-if-generator.git
cd what-if-generator
````

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:

```
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
```

Start the backend server:

```bash
npm run dev
```

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend will run at:
`http://localhost:3000`

Backend API will run at:
`http://localhost:5000/api/what-if`

---

## 🧠 Example Usage

1. Enter an event like:

   ```
   What if the Titanic never sank?
   ```

2. Click **Generate What-If Timeline**.

3. View the alternate history dynamically:

   * Nodes = events
   * Links = flow of time
   * Zoom, Drag, Pan
   * Export your timeline as PNG
   * Compare multiple "what if" versions side-by-side

---

## 🛡️ Environment Variables

| Variable         | Description                        |
| ---------------- | ---------------------------------- |
| `PORT`           | Backend server port (default 5000) |
| `OPENAI_API_KEY` | Your OpenAI API Key                |

---

## 📦 Deployment Suggestion

* Frontend → [Vercel](https://vercel.com) / [Netlify](https://www.netlify.com)
* Backend → [Render](https://render.com) / [Railway](https://railway.app)

---

## 📜 License

This project is licensed under the MIT License.
Feel free to fork and enhance it!

---

## 📣 Credits

* Built with ❤️ using React, Bootstrap, D3.js, Node.js, and OpenAI GPT-4.
* Developed by Nuraj250

<p align="center">
  <img src="https://via.placeholder.com/1200x350/0279c4/FFFFFF?text=CodeAnalyse.io" alt="CodeAnalyse.io Banner"/>
</p>

# CodeAnalyse.io: AI-Powered Code Defect Prediction Platform

**CodeAnalyse.io is a full-stack, polyglot microservice application designed to help developers improve code quality. It uses a custom-trained Machine Learning model to analyze Java code and predict the statistical probability of hidden defects.**

This project is a comprehensive showcase of modern software engineering, demonstrating expertise in enterprise backend development with Java, practical data science with Python, and dynamic, type-safe frontend development with React.

---

## ✨ Key Features

-   **🧠 AI-Powered Defect Prediction:** Submit raw Java code and receive a method-by-method analysis, predicting the probability of each method containing a hidden bug or defect.
-   **🔐 Secure, Stateless Authentication:** Full user registration and login system built with **Spring Security 6** and **JSON Web Tokens (JWT)** for secure API communication.
-   **🌉 Polyglot Microservice Architecture:** A robust system where a **Java (Spring Boot)** backend orchestrates user interactions and communicates via REST API with a specialized **Python (Flask)** microservice that houses the AI model.
-   **📜 Submission Persistence:** All code submissions and their analysis results are persisted in a **MySQL** database, linked to the user's account.
-   **💻 Polished & Responsive Frontend:** A clean, modern, and type-safe single-page application (SPA) built with **React** and **TypeScript**, featuring professional UI components and a custom snackbar notification system.

---

## 🚀 Project in Action

**Note:** _A stable cloud deployment is currently pending. However, the application is fully functional and the following visuals demonstrate the complete end-to-end user flow running locally._

### **Live Demo GIF**

A user signs up, logs in, is redirected to the dashboard, submits Java code, and receives a real-time analysis from the AI model, complete with professional notifications.

<p align="center">
  <img src="[LINK_TO_YOUR_DEMO_GIF_HERE]" alt="Application Demo GIF" width="90%">
</p>

### **Screenshots**

| Login & Signup | Dashboard & Analysis |
| :---: | :---: |
| ![Login and Signup Pages]([LINK_TO_AUTH_SCREENSHOT_HERE]) | ![Dashboard with Analysis Results]([LINK_TO_DASHBOARD_SCREENSHOT_HERE]) |

---

## 🏗️ Architecture & Tech Stack

This project utilizes a modern, decoupled microservice architecture. This design pattern provides a clear separation of concerns, allowing each service to be developed, deployed, and scaled independently.

```mermaid
graph TD
    A[User's Browser] -->|HTTPS Request| B(React Frontend);
    B -->|/api/auth/**| C{Java Backend - Spring Boot};
    B -->|/api/submissions/** [JWT]| C;
    C -->|Read/Write User/Submission| D[(MySQL Database)];
    C -->|POST /predict| E(Python Backend - Flask);
    E -->|Returns Analysis| C;
    C -->|Returns API Response| B;

    subgraph "Frontend"
        B
    end
    subgraph "Backend Services"
        C
        E
        D
    end
    
    style B fill:#61DAFB,stroke:#333,stroke-width:2px;
    style C fill:#6DB33F,stroke:#333,stroke-width:2px;
    style E fill:#3776AB,stroke:#333,stroke-width:2px;
    style D fill:#4479A1,stroke:#333,stroke-width:2px;
```

Component	Technology	Purpose
☕ Java Backend	Spring Boot 3, Spring Security 6, JPA/Hibernate, MySQL	The "Enterprise Body." Manages user data, authentication, security, and orchestrates calls to other services.
🐍 Python Backend	Flask, Scikit-learn, Pandas, Lizard	The "AI Brain." A specialized service for ML model inference and static code analysis.
⚛️ Frontend	React 18, TypeScript, Vite, React Router, Axios	The "Interactive Face." A modern, type-safe, and responsive user interface with a custom notification system.
🐳 DevOps	Docker	Each backend service is fully containerized in its own Dockerfile, ensuring portability and reproducible builds.
🧠 The AI Model: From Data to Deployment

The core of this project is the defect prediction model. It is not just a call to an external AI API; it is a model I trained from scratch.

Dataset: The model was trained on the well-known KC1 dataset from the NASA PROMISE repository, containing software metrics and known defect data from real-world Java projects. The non-feature id column was programmatically dropped to ensure only relevant metrics were used for training.

Feature Engineering: A custom "Feature Extractor" was built in Python using the lizard library. It parses raw Java code and calculates the 21 specific software metrics (e.g., Cyclomatic Complexity, Lines of Code, Halstead metrics) required by the model. The extractor is robustly designed with getattr to handle cases where a metric may not apply to a given method.

Training: A LogisticRegression classifier from Scikit-learn was trained to learn the statistical relationship between these code metrics and the likelihood of a defect. The resulting trained model and scaler objects were serialized using joblib.

Inference as a Service: The final, trained model is served via a Flask API endpoint. When it receives a new set of metrics, it performs inference to predict the defect probability, demonstrating a complete and practical Machine Learning workflow.

⚙️ How to Run Locally

The entire application can be run on a local machine for development and testing.

Clone the repository:

git clone https://github.com/udara-lakshitha/CodeAnalyse.io.git
cd CodeAnalyse.io
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Prerequisites:

Docker & Docker Compose (for future use)

Node.js v18+ (for frontend)

Java 17+ & Maven (for Java backend)

Python 3.11+ (for Python backend)

Run the Backend Services:

Python: Navigate to backend-python, create and activate a virtual environment, run pip install -r requirements.txt, and then run python app.py.

Java: Open the backend-java project in IntelliJ/VSCode, ensure your MySQL database is running, and run the ServerApplication.

Run the Frontend Service:

In a new terminal: navigate to frontend-react, run npm install, and then run npm run dev.

Access the application:

Frontend: http://localhost:5173

🌟 What I Learned & Demonstrated

This project was a deep dive into full-stack development and practical machine learning, solidifying skills in:

Backend Engineering: Architecting and building secure, scalable, and production-ready REST APIs using Spring Boot and Spring Security.

Machine Learning Workflow: Executing an end-to-end ML lifecycle, from data cleaning and model training to deploying the model as a live, callable microservice.

Frontend Development: Building dynamic, type-safe, and interactive user interfaces with React, TypeScript, and modern state management patterns like Context API.

System Design: Designing and implementing a polyglot microservice architecture, managing inter-service communication via REST, and handling configuration for different environments.

DevOps Principles: Containerizing applications with Docker for portability, ensuring a consistent development and deployment environment.

👤 Connect with Me

Created by Udara Lakshitha - A passionate developer bridging the gap between enterprise software and artificial intelligence.

LinkedIn: https://linkedin.com/in/yudara-lakshitha

GitHub: https://github.com/udara-lakshitha

IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
IGNORE_WHEN_COPYING_END

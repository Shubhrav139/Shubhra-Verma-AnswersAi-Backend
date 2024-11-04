# Answers AI Backend
This repository contains the backend for Answers AI. Below are the steps to set up environment variables, build, and run the backend in a Docker container.

## **Environment Setup**

1. **Create a .env file** in the root directory of your project to store environment variables, including the database connection URL and other secrets.

2. **Add Required Environment Variables** to the `.env` file. An example structure:
   
   ```
   PORT=3000
   DATABASE_URL=mongodb://username:password@host:port/database
   ACCESS_TOKEN_SECRET=access_token_secret
   ACCESS_TOKEN_EXPIRY=access_token_expiry
   REFRESH_TOKEN_SECRET=refresh_token_secret
   REFRESH_TOKEN_EXPIRY=refresh_token_expiry
   GOOGLE_GENERATIVE_AI_SECRET_KEY=google_generative_ai_secret_key
   ```
## **Docker Setup**

1. **Clone the Repository**

   Clone this repository to your local machine:
    ```
    git clone https://github.com/Shubhrav139/Shubhra-Verma-AnswersAi-Backend.git
    cd Shubhra-Verma-AnswersAi-Backend
    ```
    
2. **Build the Docker Image**
  
    Use the following command to build the Docker image, replacing answer-ai-be with the desired image name:
    ```
    docker build -t answer-ai-be .
    ```
    
3. **Run the Docker Container**

    Use the following command to start the container with the necessary configurations:
    ```
    docker run --memory=4g -p 3000:3000 --env-file .env answer-ai-be
    ```

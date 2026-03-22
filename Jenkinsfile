pipeline {
    agent any
    environment {
        // Pulls your Docker Hub credentials securely from Jenkins
        DOCKER_CREDS = credentials('docker-hub-credentials') 
        // Define the variables for your specific tagging format
        REG_NO = "2023BCD0026"
        ROLL_NO = "2023BCD0026"
        // Construct the full image tags dynamically
        FRONTEND_IMAGE = "${DOCKER_CREDS_USR}/${REG_NO}_${ROLL_NO}_frontend:latest"
        BACKEND_IMAGE = "${DOCKER_CREDS_USR}/${REG_NO}_${ROLL_NO}_backend:latest"
    }
    stages {
        stage('1. Checkout Code') {
            steps {
                // Pulls the latest code from your main branch
                git branch: 'main', url: 'https://github.com/Stranger542/DevOps-game-hub.git'
            }
        }
        stage('2. Build Docker Images') {
            steps {
                echo "Building Frontend Image: ${FRONTEND_IMAGE}"
                sh "docker build -t ${FRONTEND_IMAGE} ./frontend"       
                echo "Building Backend Image: ${BACKEND_IMAGE}"
                sh "docker build -t ${BACKEND_IMAGE} ./backend"
            }
        }
        stage('3. Docker Hub Login') {
            steps {
                // Securely log into Docker Hub using the credentials block
                sh 'echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin'
            }
        }
        stage('4. Push Images to Docker Hub') {
            steps {
                echo "Pushing Frontend Image..."
                sh "docker push ${FRONTEND_IMAGE}"       
                echo "Pushing Backend Image..."
                sh "docker push ${BACKEND_IMAGE}"
            }
        }
    }
    post {
        always {
            // Clean up credentials from the Jenkins workspace after running
            sh 'docker logout'
        }
        success {
            echo "Pipeline completed! Images successfully pushed to Docker Hub."
        }
        failure {
            echo "Pipeline failed. Please check the stage logs."
        }
    }
}

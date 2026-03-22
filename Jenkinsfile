pipeline {
    agent any

    // Define environment variables by pulling them from Jenkins Credentials
    environment {
        DOCKER_USERNAME = credentials('docker-hub-username')
        DOCKER_PASSWORD = credentials('docker-hub-password')
        EC2_HOST        = credentials('ec2-public-ip')
        EC2_USER        = credentials('ec2-username') // Usually 'ubuntu' or 'ec2-user'
    }

    stages {
        stage('Checkout') {
            steps {
                // Pulls the source code from your GitHub repository
                checkout scm
            }
        }

        stage('Docker Login') {
            steps {
                // Log in to Docker Hub so we can push the images
                sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
            }
        }

        stage('Build and Push Backend') {
            steps {
                dir('backend') {
                    sh "docker build -t ${DOCKER_USERNAME}/game-hub-backend:latest ."
                    sh "docker push ${DOCKER_USERNAME}/game-hub-backend:latest"
                }
            }
        }

        stage('Build and Push Frontend') {
            steps {
                dir('frontend') {
                    sh "docker build -t ${DOCKER_USERNAME}/game-hub-frontend:latest ."
                    sh "docker push ${DOCKER_USERNAME}/game-hub-frontend:latest"
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                // Requires the 'SSH Agent' plugin installed in Jenkins
                // 'ec2-ssh-key' is the ID of the private key credential stored in Jenkins
                sshagent(['ec2-ssh-key']) {
                    sh '''
                        // SSH into the EC2 instance and run deployment commands
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << 'EOF'
                            mkdir -p ~/game-hub
                            cd ~/game-hub
                            
                            // Recreate the docker-compose file on the server
                            cat << 'INNER_EOF' > docker-compose.yml
                            version: '3.8'
                            services:
                              backend:
                                image: ${DOCKER_USERNAME}/game-hub-backend:latest
                                ports:
                                  - "5000:5000"
                                restart: always
                              frontend:
                                image: ${DOCKER_USERNAME}/game-hub-frontend:latest
                                ports:
                                  - "80:80"
                                restart: always
                                depends_on:
                                  - backend
                            INNER_EOF
                            
                            // Log in to Docker Hub on the server, pull, and run
                            echo ${DOCKER_PASSWORD} | sudo docker login -u ${DOCKER_USERNAME} --password-stdin
                            sudo docker compose pull
                            sudo docker compose up -d
                        EOF
                    '''
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker credentials from the Jenkins worker after the run
            sh 'docker logout'
        }
        success {
            echo "Pipeline completed successfully! The Game Hub is deployed."
        }
        failure {
            echo "Pipeline failed. Check the logs for more details."
        }
    }
}

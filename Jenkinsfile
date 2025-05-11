pipeline {
    agent any

    environment {
        IMAGE_NAME = "portfolio-image"
        CONTAINER_NAME = "portfolio-container"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/SanmathiSedhupathi/MyPortfolio.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Stop & Remove Existing Container') {
            steps {
                sh """
                    docker stop $CONTAINER_NAME || true
                    docker rm $CONTAINER_NAME || true
                """
            }
        }

        stage('Run Docker Container') {
            steps {
                sh "docker run -d -p 3000:80 --name $CONTAINER_NAME $IMAGE_NAME"
            }
        }

    }

    post {
        success {
            echo '🎉 Deployment successful!'
        }
        failure {
            echo '❌ Build or deployment failed.'
        }
    }
}

pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'portfolio-image'
        REPO_URL = 'https://github.com/SanmathiSedhupathi/MyPortfolio.git'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                script {
                    // Checking out the repository
                    checkout scm
                }
            }
        }

        stage('Clone Repository') {
            steps {
                script {
                    // Pulling latest changes from the repository
                    sh """
                    git clone ${REPO_URL}
                    cd MyPortfolio
                    git checkout main
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Building the Docker image from the repository
                    sh '''
                    docker build -t ${DOCKER_IMAGE} .
                    '''
                }
            }
        }

        stage('Stop & Remove Existing Container') {
            steps {
                script {
                    // Stop and remove any existing container before starting a new one
                    sh """
                    docker ps -q -f name=portfolio_container | xargs -r docker stop
                    docker ps -a -q -f name=portfolio_container | xargs -r docker rm
                    """
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Run the Docker container in detached mode
                    sh '''
                    docker run -d --name portfolio_container ${DOCKER_IMAGE}
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment succeeded.'
        }

        failure {
            echo '❌ Deployment failed.'
        }
    }
}

pipeline {
    agent {
        label: 'windows'
    }


    parameters {
        string(name: 'GREP', defaultValue: '', description: 'Фільтр тестів за іменем')
        string(name: 'WORKERS', defaultValue: '2', description: 'Кількість паралельних воркерів для виконання тестів')
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    environment {
        CI = 'true'
        PLAYWRIGHT_HTML_OPEN = 'never'
        PLAYWRIGHT_JUNIT_OUTPUT_NAME = 'results/junit.xml'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                bat 'node -v && npm -v'
                bat 'npm ci'
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright') {
            steps {
                script {
                    def grep = params.GREP?.trim() ? "-g \"${params.GREP.trim()}\"" : ''
                    withCredentials([usernamePassword(credentialsId: 'qauto-http', usernameVariable: 'HTTP_USERNAME', passwordVariable: 'HTTP_PASSWORD')]) {
                        bat "npx playwright test --workers=${params.WORKERS} --reporter=line,html,junit ${grep}"
                    }
                }
            }
        }
    }

    post {
        always {
            junit testResults: 'results/junit.xml', allowEmptyResults: true
            publishHTML(target: [
                reportName           : 'Playwright Report',
                reportDir            : 'playwright-report',
                reportFiles          : 'index.html',
                keepAll              : true,
                alwaysLinkToLastBuild: true,
                allowMissing         : true
            ])
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
        }
    }
}

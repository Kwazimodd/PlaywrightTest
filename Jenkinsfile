// =====================================================================
// Playwright — обычный запуск
// Jenkins: http://localhost:8081  (Windows-служба, поэтому шаги через `bat`)
// Job: Pipeline -> Pipeline script from SCM -> Script Path: Jenkinsfile
// =====================================================================
pipeline {
    agent any

    parameters {
        string(name: 'GREP', defaultValue: '', description: 'Фильтр тестов по имени (-g). Пусто = все тесты')
        string(name: 'WORKERS', defaultValue: '2', description: 'Количество воркеров Playwright')
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    environment {
        // playwright.config.js смотрит на CI: retries=2, forbidOnly, .env-файлы не грузятся
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
                // на Windows --with-deps не нужен; браузер кэшируется между билдами
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright') {
            steps {
                script {
                    def grep = params.GREP?.trim() ? "-g \"${params.GREP.trim()}\"" : ''
                    // --reporter из CLI перекрывает reporters из конфига (html + junit для Jenkins)
                    bat "npx playwright test --workers=${params.WORKERS} --reporter=line,html,junit ${grep}"
                }
            }
        }
    }

    post {
        always {
            // график тестов на странице джобы (плагин JUnit)
            junit testResults: 'results/junit.xml', allowEmptyResults: true
            // HTML-отчёт Playwright (плагин HTML Publisher)
            publishHTML(target: [
                reportName           : 'Playwright Report',
                reportDir            : 'playwright-report',
                reportFiles          : 'index.html',
                keepAll              : true,
                alwaysLinkToLastBuild: true,
                allowMissing         : true
            ])
            // trace.zip можно открыть на https://trace.playwright.dev
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
        }
    }
}

// def COLOR_MAP = [
//     'SUCCESS': 'good', 
//     'FAILURE': 'danger',
// ]

pipeline { 
    agent any
      environment {

        EMAIL_BODY = 

        """

            <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>

            <p>

            View console output at 

            "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"

            </p> 

            <p><i>(Build log is attached.)</i></p>

        """

        EMAIL_SUBJECT_START = "STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"

        EMAIL_SUBJECT_SUCCESS = "Status: 'SUCCESS' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'" 

        EMAIL_SUBJECT_FAILURE = "Status: 'FAILURE' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'" 

        EMAIL_RECEPIENT = 'smmuiruri@gmail.com'

    }

  

  tools { 
    nodejs "Node-Build"
  }
  stages { 
    stage ('Start') {
      steps {
        // send build started notifications
        slackSend (color: '#FFFF00', message: "STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
      
          // send to email
        emailext (
          body: EMAIL_BODY, 

          subject: EMAIL_SUBJECT_START,

          to: EMAIL_RECEPIENT
          )
      }
    }
    stage('clone repository') {
      steps { 
        git 'https://github.com/smmuiruri/gallery'
      }
    }
    stage('Build') {
      steps { 
        sh 'npm install'
      }
    }
    stage('Tests') {
      steps { 
        sh 'npm test'
      }
    }
    stage('Deploy to Heroku') {
      steps {
        withCredentials([usernameColonPassword(credentialsId: 'heroku', variable: 'HEROKU_CREDENTIALS' )]){
          sh 'git push https://${HEROKU_CREDENTIALS}@git.heroku.com/dry-retreat-51059.git master'
        }
      }
    }
}
post {
  success {

      slackSend (color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
      
      emailext attachLog: true, 
          body: EMAIL_BODY, 

          subject: EMAIL_SUBJECT_SUCCESS,

          to: EMAIL_RECEPIENT
  }

  failure {

      slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")

      emailext attachLog: true, 
          body: EMAIL_BODY, 

          subject: EMAIL_SUBJECT_FAILURE, 

          to: EMAIL_RECEPIENT
  }
}
}

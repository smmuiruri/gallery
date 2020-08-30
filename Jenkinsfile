// def COLOR_MAP = [
//     'SUCCESS': 'good', 
//     'FAILURE': 'danger',
// ]
// def getBuildUser() {
//     return currentBuild.rawBuild.getCause(Cause.UserIdCause).getUserId()
// }
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

        EMAIL_SUBJECT_SUCCESS = "Status: 'SUCCESS' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'" 

        EMAIL_SUBJECT_FAILURE = "Status: 'FAILURE' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'" 

        EMAIL_RECEPIENT = 'smmuiruri@gmail.com'

        // // test variable: 0=success, 1=fail; must be string
        // doError = '0'
        // BUILD_USER = ''
    }

  

  tools { 
    nodejs "Node-Build"
  }
  stages { 
    //   stage('Checkout code') {
    //   steps {
    //       checkout scm
    //       sh 'git log HEAD^ ..HEAD --pretty = "%h changes by %an , %ar - %s" > GIT_CHANGES'
    //       def lastchanges = readFile('GIT_CHANGES')
    //       slackSend color: "#warning", message: "Build Started :grey-circle: ${env.JOB_NAME} ${env.BUILD_NUMBER}"
    //   }
    // }
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
//     stage('Error') {
//             steps {
//                 echo "Failure :("
//                 error "Test failed on purpose, doError == str(1)"
//             }
//         }
//     stage('Success') {
//         // when doError is equal to 0, just print a simple message
//         when {
//             expression { doError == '0' }
//         }
//         steps {
//             echo "Success :)"
//         }
//     }
// }

//     // Post-build actions
//     post {
//         always {
//             script {
//                 BUILD_USER = getBuildUser()
//             }
//             echo 'I will always say hello in the console.'
//             slackSend channel: '#sammymosh',
//                 color: COLOR_MAP[currentBuild.currentResult],
//                 message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} by ${BUILD_USER}\n More info at: ${env.BUILD_URL}"
//         }
    
    stage('Publish Results'){
      if('SUCCESS' === currentBuild.getPreviousBuild().getResult()) {
        slackSend channel: '#qa-alerts', color: 'good', message: "Build Successful :green-circle: \n `${env.JOB_NAME} - #${env.BUILD_NUMBER} Back to normal (<${env.BUILD_URL}|Open in Jenkins>)"
      }
    }
  
  stage (err) {
      if('FAILURE' != currentBuild.getPreviousBuild().getResult()) {
          slackSend channel: '#qa-alerts', color: 'danger', message: "Build Fail :red-circle: \n `${env.JOB_NAME} - #${env.BUILD_NUMBER} Failure (<${env.BUILD_URL}|Open in Jenkins>)"
      }
      throw err
  }
}
  success {
      emailext attachLog: true, 
          body: EMAIL_BODY, 

          subject: EMAIL_SUBJECT_SUCCESS,

          to: EMAIL_RECEPIENT
  }

  failure {
      emailext attachLog: true, 
          body: EMAIL_BODY, 

          subject: EMAIL_SUBJECT_FAILURE, 

          to: EMAIL_RECEPIENT
  }
}

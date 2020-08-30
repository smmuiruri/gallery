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
// //send build success to slack
//       slackSend (color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
//send build success to email    
      emailext attachLog: true, 
          body: EMAIL_BODY, 

          subject: EMAIL_SUBJECT_SUCCESS,

          to: EMAIL_RECEPIENT
  }

  failure {
// //send build failure to slack
//       slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
//send build failure to email
      emailext attachLog: true, 
          body: EMAIL_BODY, 

          subject: EMAIL_SUBJECT_FAILURE, 

          to: EMAIL_RECEPIENT
  }
}
}
node {
 try {
 stage 'Checkout'
 checkout scm
 
 sh 'git log HEAD^..HEAD --pretty="%h %an - %s" > GIT_CHANGES'
 def lastChanges = readFile('GIT_CHANGES')
 slackSend color: "warning", message: "Started `${env.JOB_NAME}#${env.BUILD_NUMBER}`\n\n_The changes:_\n${lastChanges}"
 
 stage 'Clone repository'
 echo 'Repository exists'
 stage 'Test'
 echo 'testing'
 stage 'Deploy'
 echo "Testing deploy."
 
 stage 'Publish results'
 slackSend color: "good", message: "Build successful :meow_party: \n `${env.JOB_NAME}#${env.BUILD_NUMBER}` <${env.BUILD_URL}|Open in Jenkins> \n successfully deployed Live site \n https://dry-retreat-51059.herokuapp.com/"
 }
 
 catch (err) {
 slackSend color: "danger", message: "Build failed :angry: \n`${env.JOB_NAME}#${env.BUILD_NUMBER}` <${env.BUILD_URL}|Open in Jenkins>"
 
 throw err
 }
}

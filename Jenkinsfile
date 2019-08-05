def notifyStarted() {
  // send to email
  emailext (
      subject: "Jenkins job STARTED: '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
	  recipientProviders: [[$class: 'DevelopersRecipientProvider'], 
				[$class: 'RequesterRecipientProvider']],
		to: 'ckydas@uecomm.com.au'
    )
}

def notifySuccessful() {
    // send to email
  emailext (
      subject: "Jenkins Job SUCCESSFUL: '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
      recipientProviders: [[$class: 'DevelopersRecipientProvider'], 
				[$class: 'RequesterRecipientProvider']],
		to: 'ckydas@uecomm.com.au'
    )
}

def notifyFailed() {

  emailext (
      subject: "Jenkins Job FAILED: '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
      recipientProviders: [[$class: 'DevelopersRecipientProvider'], 
				[$class: 'RequesterRecipientProvider']],
		to: 'ckydas@uecomm.com.au'
    )
}

node('umelat71'){
  try {
   // notifyStarted()
      
    stage('BuildPreperation') { 
        def fullbuild = "${FullBuild}"
        if ( fullbuild == "true" ) {
            dir ("/ue/DockerBuilds/workspace/sdx/"){
                sh "rm -rf /ue/DockerBuilds/workspace/sdx/sdns-portal/"
                echo "Starting Git Clone"
                sh "git clone git@gitlab.corp.uecomm.com.au:sdx/sdns-portal.git"
            }    
            dir ("/ue/DockerBuilds/workspace/sdx/sdns-portal/"){
                sh "/bin/git checkout ${Branch}"
                sh "npm install"
            }
        } else {
        //Partial build
                dir ("/ue/DockerBuilds/workspace/sdx/sdns-portal/"){
                    sh "git pull"
                    sh "/bin/git checkout ${Branch}"
                    sh "rm -rf /ue/DockerBuilds/workspace/sdx/sdns-portal/platforms/browser/www"
                }
        }
         
   }
 
   stage('Build') {
          // Run Build
        dir ("/ue/DockerBuilds/workspace/sdx/sdns-portal/"){
             sh "set +x ; . ~/.bashrc ; unset HTTP_PROXY HTTPS_PROXY ; set -x ; ionic cordova build browser --prod --release"
        }
   }
   stage('DeployDev') {
        def deploy2dev = "${DeployDEV}"
        if ( deploy2dev == "true" ) {
           //rsync -a (archive), -I (ignore times, always overwrite)
                sh "rsync -aIO --delete /ue/DockerBuilds/workspace/sdx/sdns-portal/platforms/browser/www/ umelad80:/var/www/html/sdnsportal/"

        } else {
                echo 'Do not deploy to DEV'
        }   
   }
   
  // stage('Store') {
      //  stash name: "target", includes: "target/*.zip"
       // archive 'target/*.zip'
 //  }

  // notifySuccessful()
  } catch (e) {
    currentBuild.result = "FAILED"
   // notifyFailed()
    throw e
  }
}

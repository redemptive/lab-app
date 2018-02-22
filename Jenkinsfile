#!/usr/bin/env groovy
import groovy.json.JsonOutput
import java.util.Optional
import hudson.tasks.test.AbstractTestResultAction
import hudson.model.Actionable
import hudson.tasks.junit.CaseResult

def speedUp = '--configure-on-demand --daemon --parallel'
def output = "";
def author = "";
def message = "";
def slackNotificationChannel = 'eng-5-build'
def js = 0;

def isPublishingBranch = { ->
   return env.GIT_BRANCH == 'origin/master' || env.GIT_BRANCH =~ /release.+/
}

def isResultGoodForPublishing = { ->
   return currentBuild.result == null
}

def isJasmine = {
  sh "sudo ln -s /usr/bin/nodejs /usr/bin/node"

  sh script: 'jasmine > log.txt || true'
  env.WORKSPACE = pwd()
  js_output =  readFile "${env.WORKSPACE}/log.txt"
  println "something"
  println js_output[37]

  if (js_output[37] == "N") {
    js = js + 1
  }
  sh "sudo unlink /usr/bin/node"
}

def notifySlack(text, channel, attachments) {
  def slackURL = "${env.SLACK_WEBHOOK}"
  def jenkinsIcon = "https://wiki.jenkins-ci.org/download/attachments/2916393/logo.png"

  def payload = JsonOutput.toJson([text: text,
      channel: channel,
      username: "Jenkinsfile test",
      icon_url: jenkinsIcon,
      attachments: attachments
  ])

  sh "curl -X POST --data-urlencode \'payload=${payload}\' ${slackURL}"
}

def databaseInfo(studentName, teacherName, score, labName) {
  def appUrl = "34.244.185.46/addresult"


  sh "curl -d 'studentName=${studentName}&teacherName=${teacherName}&score=${score}&labName=${labName}' -X POST ${appUrl}"
}

def getGitAuthor = {
   def commit = sh(returnStdout: true, script: 'git rev-parse HEAD')
   author = sh(returnStdout: true, script: "git --no-pager show -s --format='%an' ${commit}").trim()
}

def getLastCommitMessage = {
   message = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
}

def populateGlobalVariables = {
   getLastCommitMessage()
   getGitAuthor()
   isJasmine()
}


node("ALMS") {

   try {
       stage('Checkout') {
           checkout scm
       }

       stage("Build"){
           populateGlobalVariables()

           if (js == 0) {
             output = js_output[-47..-27]
           } else {
             sh script: 'rspec spec > ruby.txt || true'
             env.WORKSPACE = pwd()
             ruby_output =  readFile "${env.WORKSPACE}/ruby.txt"
             output = sh(returnStdout: true, script: "grep -oP '.*([0-9]\\sexample.*)' ruby.txt")
           }


           def buildColor = currentBuild.result == null ? "good" : "warning"
           def buildStatus = currentBuild.result == null ? "Success" : currentBuild.result
           def jobName = "${env.JOB_NAME}"
           jobName = jobName.getAt(0..(jobName.indexOf('/') - 1))
           notifySlack("", slackNotificationChannel, [
               [

                   color: "${buildColor}",

                   text: "${buildStatus}\n${author}",
                   fields: [
                       [
                           title: "Branch",
                           value: "${env.BRANCH_NAME}",
                           short: true
                       ],
                       [
                           title: "Test Results",
                           value: "${output}",
                           short: true
                       ],

                       [
                           title: "Last Commit",
                           value: "${message}",
                           short: false
                       ]
                   ]
               ]
           ])
        databaseInfo("${author}", "Steve", "${output}", "${env.GIT_URL}" )
           }

   } catch (hudson.AbortException ae) {

   } catch (e) {
       def buildStatus = "Failed"
       if (isPublishingBranch()) {
           buildStatus = "MasterFailed"
       }
       notifySlack("", slackNotificationChannel, [
           [

               color: "danger",
               author_name: "${author}",
               text: "${buildStatus}",
               fields: [
                   [
                       title: "Branch",
                       value: "${env.BRANCH_NAME}",
                       short: true
                   ],
                   [
                       title: "Test Results",
                       value: "${output}",
                       short: true
                   ],
                   [
                       title: "Last Commit",
                       value: "${message}",
                       short: false
                   ],
                   [
                       title: "Error",
                       value: "${e}",
                       short: false
                   ]
               ]
           ]
       ])
       throw e
   }
 }

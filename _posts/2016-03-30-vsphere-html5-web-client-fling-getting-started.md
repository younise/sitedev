---
title: 'vSphere HTML5 Web Client Fling Getting Started'
date: '2016-03-30 T10:41:02-07:00'
author: 'eyounis'
layout: post
permalink: /vsphere-html5-web-client-fling-getting-started/
image:
  path: '/assets/img/2016/Demo.jpg'
categories:
    - vCenter
tags:
    - 'HTML5 Client'
    - 'Web Client'
---




VMware announced the first step towards making a HTML5 Web Client a reality, the vSphere HTML5 Web Client Fling. This first release of the Fling will focus primarily on VM management, with more updates coming.  Here is a list of the features and operations available in this first release:
* VM power operations
* VM Edit Settings (simple CPU, Memory, Disk changes)
* VM Console
* VM and Host Summary pages
* VM Migration (only to a Host)
* Clone to Template/ VM
* Create VM on a Host (limited)
* Additional monitoring views: Performance charts, Tasks, Event
* Global Views: Recent tasks, Alarms (view only)
* Integrated Feedback Tool

The vSphere HTML5 Web Client Fling is a standalone appliance that can be deployed in your existing or new vSphere 6.0 and later environments in a transparent manner. The Fling does not make any changes to your existing vCenter or Platform Services Controller components. Nor does it affect any operations, such as the use of the current vSphere Web Client, as it is meant to run side by side. The Fling should be deployed with the following specifications and prerequisites in mind:
* 2vCPU, 4GB of RAM, and 14GB of storage
* Runs only on vSphere 6.0 or later
* Recommended Browsers include Chrome, Firefox, and IE11. Other browsers may work, but have not been tested yet
* Usable with either the vCenter Server Appliance (VCSA) or Windows
* Enable SSH on your vCenter Server Appliance, temporarily needed only during the install process
* Enable vCenter Server Appliance Bash Shell, temporarily needed to SCP configuration files from the Fling to the vCenter Server Appliance
    * shell.set --enable True
    * shell
    * chsh –s /bin/bash root

[IMAGE HERE]

## vSphere HTML5 Web Client Fling Deployment
Prior to deploying the vSphere HTML5 web client Fling appliance verify all specifications are in place and prerequisites have been met. The Fling OVF can be deployed using either the vSphere 6.0 Web Client or Embedded Host Client. Go through the deploy OVF Template wizard, power on the the fling appliance and wait for the boot process to complete. When the Fling appliance is at the console screen, SSH using the login username root and password demova.
Note: when deploying with the vSphere client (aka C# or Thick client) an IP pool is required. This is taken care of for you when using the vSphere Web Client.

Let’s go through the process of configuring the vSphere HTML5 Web Client Fling with both the vCenter Server Appliance and vCenter for Windows

## Configuration with the vCenter Server Appliance
Step 1 
Run the following command to register the Fling appliance with vCenter Server Appliance:
/etc/init.d/vsphere-client configure --start yes --user root --vc <FQDN or IP Address of vCenter Server> --ntp <FQDN or IP Address of NTP server>
￼
Step 2
Continue the registration process by answering “Yes” to continue connecting and entering your vCenter Server Appliance password.
￼
During the registration process the following configuration files are created and copied from the vCenter Server Appliance to the vSphere HTML5 Web Client Fling: webclient.properties, ds.properties, and store.jks.  Making sure the vCenter Server Appliance bash shell is enabled allows for SCP to copy these configuration files over to the Fling Appliance. Finally, the registration script is starting the web server, also installing any packages and plugins needed.
￼
## Configuration with vCenter for Windows
As stated earlier the vSphere HTML5 Web Client Fling also works with vCenter 6.0 for Windows. The process is similar to the vCenter Server Appliance. In this release of the Fling there is more manual configuration that is done on the Windows side, but this will be more automated in a future release of the Fling.  This configuration was done running vCenter 6.0 on Windows Server 2012 R2, but other versions of windows may also work.
 Step 1
Visit the vSphere HTML5 Web Client Fling site download the Fling OVA and the server-configure.bat. Deploy the Fling appliance and power on.
￼
Step 2
On your vCenter Windows server Run the server-configure.bat as administrator or with an account that has local administrator rights. The same configuration files created on the vCenter Server Appliance (webclient.properties, ds.properties, store.jks) are also created on Windows.
Note: The script assumes vCenter was installed using the default path. Modify the install path in the script to your vCenter path.
￼
Note: If you run the server-configuration.bat without administrator rights you will receive errors and the correct files are not created.
￼
Step 3
SSH into the vSphere HTML5 Web Client Fling appliance and create the necessary directories for the configuration files:
* mkdir /etc/vmware/vsphere-client/
* mkdir /etc/vmware/vsphere-client/config/
* mkdir /etc/vmware/vsphere-client/vsphere-client/
￼
Once the directories are created, copy and place the configuration files in the corresponding directory.
Note: In this example WinSCP was used to copy the configuration files to their directories on the Fling Appliance.
* /etc/vmware/vsphere-client/store.jks
* /etc/vmware/vsphere-client/config/ds.properties
* /etc/vmware/vsphere-client/vsphere-client/webclient.properties
￼
Step 4
To add NTP server(s) run the following command on the Fling appliance
/etc/init.d/vsphere-client configure ntp_servers <IP address of NTP server(s)>
Note: It’s important to keep time in sync between vCenter and the Fling appliance.
￼
Step 5
Start the vSphere HTML5 Web Client web server /etc/init.d/vsphere-client start
￼
## Accessing the HTML5 Client
Once the vSphere HTML5 Client Web server is started go to:
https://<IP address or FDQN of the HTML5 Web Client appliance>:9443/ui
￼
The login screen should look familiar! You’re now officially logged in the new vSphere HTML5 Web Client. There are a few things I would like to point out:
* Logon load time improved, takes 5-6 seconds.
* Faster overall speed and response time.
* Search is now in the top center of the page.
* Smiley face in the upper right hand corner is the feedback tool.
* Tabs have been simplified.
* Clicking on the word “vSphere Client” in the upper left takes you home.
￼
One important feature is the smiley face in the upper right hand corner. While it looks really innocent, it does actually serve a purpose. It’s your gateway to engineering, or we’ll call it the feedback tool. This is your chance to provide valuable input and help shape your future client.
￼
## Troubleshooting
Here are a few things to validate incase you run into any issues on the way:
* Use the following command to check the status of the vSphere Client Web Server service
/etc/init.d/vsphere-client status
￼
* Other commands include stop, start, and restart
* Verify SSH is enabled on the vCenter Server Appliance
* Validate time is in sync between the vSphere HTML5 Web Client Fling Appliance and vCenter Server
* Make sure the vCenter Server Appliance Bash Shell is enabled
￼
* If using custom certificates, use the FQDN of the vCenter server during the initial registration
HTML5 technology is not new to VMware. The Platform Services Controller UI (6.0 U1) and the Embedded Host Client (6.0 U2), both fully support HTML5. Take the vSphere HTML5 Web Client Fling for a test drive and provide feedback – this is your HTML5 client, help shape its future 🙂

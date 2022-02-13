# DeviceViewer
Website with two views:
 1. Shows a device overview. 
 2. Detail view of a device. 
The device overview shows a button where .json files can be uploaded. After the upload, all devices should be listed. If you click on a device, you get to the detailed view of the corresponding device. Here are some details about implementation: 
• Asynchronous upload of a .json file to the server 
• The server saves the data in MongoDB. The upload can take place several times and adds up the data. 
• A single device can be deleted on the device overview via API request to the server. 
The detail view shows extended information about the device and a back button can be used to navigate to the device overview.

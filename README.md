
# Todo MERN App <img src="https://user-images.githubusercontent.com/46368329/123548291-cf15d680-d781-11eb-8c36-e70fdc1dd822.jpeg" height=50 align="center">
**MERN Stack** is a Javascript Stack that is used for easier and faster deployment of full-stack web applications. MERN Stack comprises of 4 technologies namely: [MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [React](https://reactjs.org/) and [Node.js](https://nodejs.org/en/). It is designed to make the development process smoother and easier.  

## Quick liks
1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Installation and Usage](#installation-and-usage)
4. [App Screenshots](#app-screenshots)
6. [Image Copyright Claims](#image-copyright-claims)

## Introduction
This ToDo App is made using MERN stack along with [AWS SES](https://aws.amazon.com/ses/) and [AWS S3](https://aws.amazon.com/s3/?nc2=type_a) services. AWS SES is used to send to send the verification email while signing up and in case if user forget the password, it is used to send the link for resetting the password. AWS S3 buckets are utilized for storing profile pictures of the users, which will be displayed on the right side of navigation bar. 

## Requirements
1. [Node JS](https://nodejs.org/en/download/)  
2. [MongoDB](https://www.mongodb.com/try/download) 
3. [AWS](https://aws.amazon.com/) account for using SES and S3 services


## Installation and Usage
1. Fork the repo and then clone it or download it.
2. First install all dependencies for both front-end and back-end:
    ```bash
    # open terminal in backend directory
    npm install

    # open terminal in frontend directory 
    npm  install
    ```

3. Create AWS account and IAM account (preferable).
4. Verify sender and receiver email in SES since by default the SES is in sandbox mode. (use this [link](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses.html))
5. Create an S3 bucket and make it public so that it can be accessed by the app hosted on local server. (use this [link](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteAccessPermissionsReqd.html#block-public-access-static-site))
5. Move to backend directory. Create a `.env` file and insert the following code. Replace values with yours!!

    ```
    PORT=YOUR_PORT
    DATABASE=mongodb://localhost:27017/todo
    SECRET=STRING_FOR_ENCRYPTING(eg. myapp)
    FRONTEND=http://localhost:3000
    BACKEND=http://localhost:8000
    SOURCE_EMAIL_ADDRESS=YOUR_SES_VERIFIED_SENDER_EMAIL
    
    AWS_ACCESS_KEY_ID=YOUR_IAM_ACCESS_KEY
    AWS_ACCESS_SECRET_KEY_ID=YOUR_IAM_SECRET_KEY
    AWS_REGION=YOUR_S3_BUCKET_REGION
    AWS_BUCKET_NAME=YOUR_BUCKET_NAME
    AWS_Uploaded_File_URL_LINK=LINK_TO_BUCKET
    ```
    - In case the project is to be deployed on AWS EC2 or any other hosting platform, use public IP or domain name in place of localhost for FRONTEND and BACKEND variables in `.env` file. 
   - In AWS_Uploaded_File_URL_LINK, use the path where you want to store profile pics (eg. https://bucketName.s3.bucketRegion.amazonaws.com/).

5. Start MongoDB server (use this [link](https://docs.mongodb.com/manual/administration/install-community/))

5. Start the server
    ```bash
    # open terminal in backend directory
    npm start 
     
    # open terminal in backend directory
    npm start
    ```

6. Now run the app
    ```javacript
    localhost:3000
    ```
    
## App Screenshots
<img src="https://user-images.githubusercontent.com/46368329/123551445-73eae080-d78f-11eb-8940-0c0338dcd946.png" width="45%"> <img src="https://user-images.githubusercontent.com/46368329/123551449-764d3a80-d78f-11eb-9d93-0ec9847d2c09.png" width="45%">

<img src="https://user-images.githubusercontent.com/46368329/123551459-79e0c180-d78f-11eb-85a7-5a020cbf0d7e.png" width="45%"> <img src="https://user-images.githubusercontent.com/46368329/123551451-76e5d100-d78f-11eb-9e71-7043081fe94d.png" width="45%">

<img src="https://user-images.githubusercontent.com/46368329/123587488-ff9e5480-d803-11eb-9585-b77207f9b259.png" width="45%"> <img src="https://user-images.githubusercontent.com/46368329/123587498-01681800-d804-11eb-87db-d5c748297ed8.png" width="45%">

<img src="https://user-images.githubusercontent.com/46368329/123551456-78af9480-d78f-11eb-8eba-f31f4308d95a.png" width="45%"> <img src="https://user-images.githubusercontent.com/46368329/123551458-79482b00-d78f-11eb-9d31-2d5edd8504df.png" width="45%">


## Image Copyright Claims
Many images used in the project belong to their respective creators/authors. No claim by me & those who use this project. :)

**Thanks for reading**


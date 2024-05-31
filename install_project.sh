#!/usr/bin/bash
[ "$UID" -eq 0 ] || { echo "This script must be run as root."; exit 1;}

# Make other files executable
chmod +x ./start_web_project.sh ./cli_project.sh

# Update and upgrade system packages
echo  "** Updating system packages **"
apt update && apt upgrade -y

# Install required packages
echo  "** Installing required packages **"
apt install software-properties-common curl -y

# Add deadsnakes PPA for Python 3.12
echo  "** Adding PPA for Python 3.12 **"
add-apt-repository ppa:deadsnakes/ppa -y

# Update package lists again
echo  "** Updating package lists **"
apt update

# Install Python 3.12
echo  "** Installing Python 3.12 **"
apt install python3.12 python3.12-dev -y

# Install pip for Python 3.12
echo  "** Installing pip for Python 3.12 **"
apt install python3-pip -y


# Install Node Version Manager (nvm)
echo  "** Installing Node Version Manager (nvm) **"
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

# Source nvm configuration
echo  "** Sourcing nvm configuration **"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Install Node.js version 20.4.0
echo  "** Installing Node.js version 20.4.0 **"
nvm install 20.4

# Create virtual environment
echo  "** Creating virtual environment for Python 3.12 **"
apt install python3.12-venv -y
python3.12 -m venv ./Automated_Grading_System/LLM/ml-server

# Activate the virtual environment
source ./Automated_Grading_System/LLM/ml-server/bin/activate

# Install requirements from requirements.txt
echo  "** Installing Python dependencies from requirements.txt **"
pip3 install -r ./Automated_Grading_System/LLM/ml-server/requirements.txt

echo  "** Installing Pytorch **"
#install pytorch
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# Deactivate the virtual environment (optional)
deactivate

# Navigate to server directory and install Node.js dependencies
echo  "** Installing Node.js dependencies in Automated_Grading_System/server **"
cd ./Automated_Grading_System/server
nvm use 20.4.0  # Switch to Node.js version 20.4.0
npm install

# Navigate to frontend directory and install Node.js dependencies
echo  "** Installing Node.js dependencies in Automated_Grading_System/frontend **"
cd ../frontend/
nvm use 20.4.0  # Switch to Node.js version 20.4.0
npm install

# Navigate to CLI directory and install Node.js dependencies
echo  "** Installing Node.js dependencies in Automated_Grading_System_CLI/CLI **"
cd ../../Automated_Grading_System_CLI/CLI
nvm use 20.4.0  # Switch to Node.js version 20.4.0
npm install

# Navigate to server directory and install Node.js dependencies (CLI)
echo  "** Installing Node.js dependencies in Automated_Grading_System_CLI/server **"
cd ../server
nvm use 20.4.0  # Switch to Node.js version 20.4.0
npm install

# MongoDB Installation
echo "** Installing MongoDb Database Server"
apt-get install gnupg curl

#
echo "** Importing the MongoDB public GPG key **"
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

#
echo "** Creating a list file for MongoDB **"

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Reloading local repo
apt-get update

# Install latest version of mongo
echo "** Installing Latest Version of Mongodb community **"
apt-get install -y mongodb-org

# Starting Mongodb server
echo "** Starting Mongodb Server at port 27017**"
systemctl start mongod
systemctl start mongod
systemctl start mongod
systemctl start mongod
# Port Access security issue in virtual box thus removing this .sock file
rm -rf /tmp/mongodb-27017.sock
systemctl start mongod
systemctl start mongod
systemctl start mongod

# Creating database named llmsenpai
mongosh --eval "use llmsenpai; quit();" 

# Start FastAPI server
echo "** Starting FastAPI server, Please wait for the llm models to be loaded!! Check the log file**"
cd ../../Automated_Grading_System/LLM/ml-server
source ./bin/activate
python3 -m uvicorn main:app --port 5000 &> ./server_log.txt &  # Run # FastAPI server in the background

echo  "** Setup completed! **"

EOF

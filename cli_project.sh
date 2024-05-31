#!/usr/bin/bash
[ "$UID" -eq 0 ] || { echo "This script must be run as root."; exit 1;}
# Loop through the ports
ports=(8000 3000)

for port in "${ports[@]}"
do
  # Find PID of process using the port
  pid=$(lsof -t -i :$port)

  # Check if PID exists
  if [[ ! -z "$pid" ]]; then
    # Send SIGTERM (graceful termination) first
    kill -TERM "$pid"

    # Check if process is still running after 5 seconds
    if [[ $(kill -0 "$pid" 2>/dev/null; echo $?) -eq 0 ]]; then
      # If still running, send SIGKILL (force termination)
      kill -KILL "$pid"
      echo "Process (PID: $pid) on port $port forcefully terminated."
    else
      echo "Process (PID: $pid) on port $port terminated gracefully."
    fi
  else
    echo "No process found on port $port."
  fi
done

# Stop Milvus Server
# PROCESS=$(ps -e | grep milvus | grep -v grep | awk '{print $1}')
# if [ -z "$PROCESS" ]; then
#   echo "No milvus process"
# fi
# kill -9 $PROCESS
# echo "Milvus stopped"

echo "Finished checking ports."

# Add NVM bash path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Start and run mongodb server
systemctl start mongod
mongosh --eval "use llmsenpai; quit();"

# use node version 20.4
nvm use 20.4
# Create Node link for the CLI project
cd ./Automated_Grading_System_CLI/CLI/
npm link

# start the node server
echo "** Starting Express JS Backend server **"
cd ../server/
npm run dev&> ./cli_server_log.txt &
cd ..

# Run CLI tool after server starts
echo "** Starting CLI Application **"
cd ./CLI
skeptic "$@"

echo "** Script execution complete. **"


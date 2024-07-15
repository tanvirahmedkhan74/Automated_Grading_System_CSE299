# Automated Grading System

This project is an Automated Grading System developed as part of the CSE299 course. The system is designed to automatically grade assignments and tests, providing immediate feedback to students.

## Prerequisites

- Ubuntu 20.04 or later
- Google Cloud Platform account

## Configuration

1. Clone the repository:

    ```sh
    git clone https://github.com/tanvirahmedkhan74/Automated_Grading_System_CSE299.git
    cd Automated_Grading_System_CSE299
    ```

2. Add the `config.env` file:

    Create a file named `config.env` in the `./server/config/` folder with the following content:

    ```env
    PORT=8000
    MONGO_URI=mongodb://localhost:27017/your_database_name
    JWT_SECRET_KEY=testsecretkey
    GOOGLE_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXX
    GOOGLE_CLIENT_SECRET=XXXXXXXXXXXXXXXXXX
    CLIENT_SIDE_URL=http://localhost:3000
    ```
   Ensure you replace the placeholders for MONGO_URI, GOOGLE_CLIENT_ID, and GOOGLE_CLIENT_SECRET with your actual values.
   
4. Configure Google Cloud Platform:

    - Set up OAuth 2.0 credentials in the Google Cloud Platform.
    - Add your email for testing purposes.

## Installation

1. Run the installation script:

    ```sh
    sudo ./install_project.sh
    ```

    This script will install and download all the necessary dependencies for the project.

2. Start the web project:

    ```sh
    sudo ./start_web_project.sh
    ```
3. Start the Command Line Interface
   ```sh
    sudo ./cli_project.sh
    ```
   example input for the cli is given in the arg.txt file

## Usage

- Access the application at `http://localhost:8000`
- For the client side, visit `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a Pull Request

## License

This project is licensed under the MIT License.

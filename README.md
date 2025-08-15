# Wanderlust - A Smart Itinerary Planner 

Wanderlust is a full-stack web application designed to simplify travel planning. By leveraging the power of AI, it generates personalized and intelligent travel itineraries, helping users discover new destinations and plan their trips seamlessly.

![Project Screenshot](https://via.placeholder.com/800x400.png?text=Your+Project+Screenshot)
Replace the URL above with a screenshot of your application.

##  Features

* *User Authentication:* Secure user registration and login system.
* *AI-Powered Itinerary Generation:* Automatically creates detailed travel plans based on user input (destination, duration, interests).
* *Itinerary Management:* Users can view, save, and manage their personal itineraries.
* *Responsive Design:* A clean and modern user interface that works on both desktop and mobile devices.

---

##  Tech Stack

* *Backend:*
    * Java
    * Spring Boot
    * Maven
* *Frontend:*
    * React
    * CSS
* *Database:*
    * MySQL
* *APIs:*
    * OpenAI API


## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:
* [Java (JDK)](https://www.oracle.com/java/technologies/downloads/)
* [Maven](https://maven.apache.org/download.cgi)
* [Node.js and npm](https://nodejs.org/en/download/)
* [MySQL](https://dev.mysql.com/downloads/installer/)

---

### Installation & Setup

1.  *Clone the repository:*
    sh
    git clone [https://github.com/tarique4456/Wanderlust-A-Smart-Itinerary-Planner.git](https://github.com/tarique4456/Wanderlust-A-Smart-Itinerary-Planner.git)
    cd Wanderlust-A-Smart-Itinerary-Planner
    

2.  *Setup the Backend:*
    * Navigate to the backend directory:
        sh
        cd wanderlust-backend
        
    * Create an application.properties file in src/main/resources/.
    * Add your database and OpenAI API key configurations. *Do not commit this file with your secret keys.*
        properties
        # MySQL Database Configuration
        spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
        spring.datasource.username=your_db_username
        spring.datasource.password=your_db_password
        spring.jpa.hibernate.ddl-auto=update

        # OpenAI API Key
        openai.api.key=YOUR_OPENAI_API_KEY
        
    * Run the backend server:
        sh
        mvn spring-boot:run
        
    * The backend will be running on http://localhost:8080.

3.  *Setup the Frontend:*
    * Open a new terminal and navigate to the frontend directory:
        sh
        cd wanderlust-frontend
        
    * Install the required npm packages:
        sh
        npm install
        
    * Run the frontend development server:
        sh
        npm start
        
    * The frontend will be running on http://localhost:3000.


##  License

This project is distributed under the MIT License. See the LICENSE file for more information.


##  Contact

Tarique Ansari - [tariqueansari1020@gmail.com] - [Link to your LinkedIn profile]

Project Link: [https://github.com/tarique4456/Wanderlust-A-Smart-Itinerary-Planner](https://github.com/tarique4456/Wanderlust-A-Smart-Itinerary-Planner)

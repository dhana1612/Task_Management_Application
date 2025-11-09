<h1>🧩 <b>Task Management Application</b></h1>

  <p>This project is a <b>Task Management System</b> consisting of a <b>.NET Web API (Backend)</b> and an <b>Angular Application (Frontend)</b>.<br>
  The backend uses <b>PostgreSQL</b> as the database, while the frontend communicates with it via <b>REST APIs</b>.</p>

  <hr>

  <h2>🏗️ <b>Backend — .NET Web API</b></h2>

  <h3>⚙️ <b>Tech Stack</b></h3>
  <ul>
    <li><b>.NET 9</b></li>
    <li><b>C#</b></li>
    <li><b>PostgreSQL</b></li>
    <li><b>Swagger</b> (for API testing and documentation)</li>
  </ul>

  <hr>

  <h3>🚀 <b>How to Run the Backend</b></h3>

  <h4>1️⃣ <b>Open the Project</b></h4>
  <p>Open the backend solution in <b>Visual Studio</b> or <b>Visual Studio Code</b>.</p>

  <h4>2️⃣ <b>Install Dependencies</b></h4>
  <pre><code>dotnet restore</code></pre>

  <h4>3️⃣ <b>Update Database Connection</b></h4>
  <p>
    - Open the file: <b>appsettings.json</b><br>
    - Locate the <b>ConnectionStrings</b> section<br>
    - Replace it with your <b>PostgreSQL connection details</b>
  </p>

  <pre><code>{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=TaskDB;Username=postgres;Password=yourpassword"
  }
}</code></pre>

  <h4>4️⃣ <b>Apply Database Migrations</b></h4>
  <pre><code>dotnet ef database update</code></pre>

  <h4>5️⃣ <b>Run the API</b></h4>
  <pre><code>dotnet run</code></pre>
  <p><i>or simply press <b>F5</b> in Visual Studio.</i></p>

 
  <hr>

  <h2>💻 <b>Frontend — Angular Application</b></h2>

  <h3>🧰 <b>Tech Stack</b></h3>
  <ul>
    <li><b>Angular 17+</b></li>
    <li><b>TypeScript</b></li>
    <li><b>Bootstrap 5</b></li>
  </ul>

  <hr>

  <h3>🚀 <b>How to Run the Frontend</b></h3>

  <h4>1️⃣ <b>Navigate to the Angular Project Folder</b></h4>
  <pre><code>cd frontend</code></pre>

  <h4>2️⃣ <b>Install Dependencies</b></h4>
  <pre><code>npm install</code></pre>

  <h4>3️⃣ <b>Update Backend API URL</b></h4>
  <p>
    Go to: <b>src/app/serviceFolder/taskService.ts</b><br><br>
    Replace the backend API URL in this line:
  </p>

  <pre><code>private apiUrl = 'https://localhost:{your_backend_port}/api/Tasks';</code></pre>

  <h4>4️⃣ <b>Run the Angular Application</b></h4>
  <pre><code>ng serve</code></pre>

  <p>Then open your browser and visit:<br>
  👉 <b>http://localhost:4200</b></p>

  <hr>

 

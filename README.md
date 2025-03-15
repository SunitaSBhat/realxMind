 <h1>Mental Health Blog</h1>
    <p>A blog website where users can share posts about mental health, comment on others' posts, and create secure accounts.</p>

    <h2>Features</h2>
    <ul>
        <li>User authentication (JWT, password hashing)</li>
        <li>Create, edit, and delete blog posts</li>
        <li>Comment system for posts</li>
        <li>RESTful API for backend</li>
    </ul>

    <h2>Tech Stack</h2>
    <ul>
        <li><b>Backend:</b> Node.js, Express.js, MongoDB, Mongoose</li>
        <li><b>Frontend:</b> EJS templating engine</li>
        <li><b>Authentication:</b> JWT (JSON Web Tokens)</li>
    </ul>

    <h2>Installation & Setup</h2>
    <p>Clone the repository:</p>
    <pre>git clone repo-url</pre>
    <pre>cd blogging</pre>

    <p>Install dependencies:</p>
    <pre>npm install</pre>

    <p>Set up environment variables in a <code>.env</code> file:</p>
    <pre>
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
    </pre>

    <p>Run the application:</p>
    <pre>npm start</pre>
    <p>Server will run </p>
    
       <h2>Security Measures</h2>
    <ul>
        <li>Passwords hashed with bcrypt.js</li>
        <li>JWT-based authentication</li>
        <li>Protected routes for logged-in users</li>
    </ul>
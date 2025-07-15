# SPA EVENTS
A modern Single Page Application (SPA) for managing and attending events and courses. Built with vanilla JavaScript, HTML5, and CSS3, this project allows users to register, log in, and interact with events in a seamless, responsive interface.

## 🚀 Features

- User registration and login (with role-based access: admin/user)
- Admin dashboard to create, edit, and delete events/courses
- List and view all available events
- Users can enroll in events and view their enrolled courses
- Prevent duplicate usernames on registration
- Responsive design for mobile and desktop
- Modern UI with custom CSS and SweetAlert2 notifications
- SPA navigation (no page reloads)

## 🛠️ Technologies Used

- HTML5
- CSS3 (Flexbox, custom properties, media queries)
- JavaScript (ES6+)
- SweetAlert2 (for notifications)
- 

## 📁 Project Structure

```bash
│
├── index.html
├── public/
│   └── database.json
├── src/
│   ├── components/
│   │   └── nav.js
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── alert.js
│   │   ├── api.js
│   │   └── index.js
│   ├── utils/
│   │   ├── auth.js
│   │   └── guards.js
│   └── views/
│   │    ├── auth.js
│   │    ├── dashboardUser.js
│   │    ├── dashbordAdmin.js
│   │    ├── landing.js
│   │    ├── login.js
│   │    ├── notFound.js
│   │    └── register.js
│   └── router.js
│  
├── package-lock.json
├── package.json
└── README.md 
```

## ⚙️ How to Run

1. Clone this repository:https://github.com/valeriacadenay/eventos_spa
   ```bash
   git clone https://github.com/valeriacadenay/eventos_spa.git
   ```
2. Install dependencies and start the local API server:
   ```bash
   npm install -json-server
   npm run dev, here give the link for the local Host

   and other console with:
   npx npx json-server public/database.json  
   here you could have the --port 3000, and you can se the endpoints that allow you to see de database.

   If you want that the project work, the two console have to be woorking!!
   ```
3. Open the local host `http://localhost:5173/` in your browser.
4. Register a new user or log in as admin (default admin: `admin` / `admin123`).
5. Explore the dashboard, create/edit/delete events (admin), or enroll in events (user).


## ✨ Future Improvements
- Persistent authentication
- Search and filter events
- Pagination for event lists
- User profile management
- Real backend integration

## 👩‍💻 Author
- Valeria Cadena Yance 
- Clan: Caiman
- Correo: valecade16@gmail.com
- 1001915276 
- GitHub: [valeriacadenay](https://github.com/valeriacadenay)

---
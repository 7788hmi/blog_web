# Blog Web Application

A modern full-stack blog application with React frontend and Flask backend.

**Live Demo:** https://blog-web-m-hamza.vercel.app

## 🚀 Quick Start

### Frontend (React + Vite)
```bash
cd react-blog-frontend
npm install
npm run dev
```

### Backend (Flask)
```bash
cd python-blog-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 📋 Features

- ✅ User Authentication (Sign up, Login)
- ✅ Create, Read, Update, Delete Posts
- ✅ Categorize Posts
- ✅ Image Upload Support
- ✅ Search & Filter
- ✅ Responsive UI with Bootstrap

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- React Router v6
- Axios
- React Bootstrap
- React Toastify

**Backend:**
- Flask 3.0
- SQLite (Development)
- JWT Authentication
- Bcrypt Password Hashing
- Flask-CORS

## 📁 Project Structure

```
blog_web/
├── react-blog-frontend/    # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   ├── assets/         # Static assets
│   │   └── App.jsx         # Main app component
│   ├── package.json
│   └── vite.config.js
├── python-blog-backend/    # Flask backend API
│   ├── app.py              # Main Flask application
│   ├── requirements.txt     # Python dependencies
│   └── uploads/            # Uploaded files
└── DEPLOYMENT_SETUP.md     # Deployment instructions
```

## 🔧 Configuration

### Frontend Environment Variables

Create `.env` in `react-blog-frontend/`:
```env
VITE_API_URL=http://localhost:3000
```

For production (set in Vercel dashboard):
```env
VITE_API_URL=https://your-backend-api-url.com
```

### Backend Environment Variables

Create `.env` in `python-blog-backend/`:
```env
FLASK_ENV=development
FLASK_DEBUG=True
JWT_SECRET=your_secret_key_here
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
BASE_URL=http://localhost:3000
```

## 📚 API Endpoints

### Authentication
- `POST /signup` - Register new user
- `POST /login` - Login user

### Posts
- `GET /posts` - Get all posts (paginated)
- `GET /posts/<id>` - Get post details
- `POST /posts` - Create new post (authenticated)
- `PUT /posts/<id>` - Update post (authenticated)
- `DELETE /posts/<id>` - Delete post (authenticated)

### Categories
- `GET /categories` - Get all categories
- `GET /category` - Get categories paginated
- `POST /categories` - Create category
- `DELETE /category/<id>` - Delete category

### Files
- `POST /file/upload` - Upload image
- `GET /uploads/<filename>` - Serve uploaded file

## 🚢 Deployment

### Deploy Frontend to Vercel

1. Connect GitHub repository to Vercel
2. Set root directory to `react-blog-frontend`
3. Add environment variable: `VITE_API_URL`
4. Deploy

See [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md) for complete instructions.

### Deploy Backend

Options:
- **Render** (recommended for beginners)
- **Railway**
- **Heroku Alternative**
- **DigitalOcean**

See [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md) for step-by-step guide.

## 🔐 Security Notes

- ⚠️ Change `JWT_SECRET` in production
- ⚠️ Never commit `.env` files
- ⚠️ Use HTTPS in production
- ⚠️ Implement rate limiting in production
- ⚠️ Add input validation

## 📝 Recent Fixes (2026-06-25)

✅ Fixed hardcoded API URLs - now uses environment variables  
✅ Fixed CORS configuration - supports multiple origins  
✅ Removed exposed `.env` files from git  
✅ Fixed duplicate Auth Provider in React  
✅ Updated requirements.txt - removed unused dependencies  
✅ Added comprehensive deployment guide  
✅ Added .env.example files for configuration reference  
✅ Updated Flask app for production use  
✅ Added Procfile for production deployment  

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Push to GitHub
5. Create a Pull Request

## 📄 License

MIT License - feel free to use for any purpose

## 🆘 Support

For issues or questions:
1. Check [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)
2. Check [DEPLOYMENT_AUDIT.md](./DEPLOYMENT_AUDIT.md)
3. Review API error messages

## 🎯 Next Steps

- [ ] Add email verification
- [ ] Implement comments on posts
- [ ] Add user profiles
- [ ] Improve search with full-text search
- [ ] Add dark mode
- [ ] Implement caching
- [ ] Add API documentation (Swagger)

---

**Ready to deploy?** Follow the [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md) guide!
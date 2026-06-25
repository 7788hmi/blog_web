# Deployment Setup Guide

This guide will help you deploy your blog application to Vercel (frontend) and choose a backend hosting solution.

## Prerequisites

- GitHub account (already done ✓)
- Vercel account (free at https://vercel.com)
- Backend hosting account (Render, Railway, or similar)
- Node.js 16+ installed locally
- Python 3.8+ installed locally (for backend)

---

## Part 1: Local Testing

### 1.1 Frontend Setup & Test

```bash
# Navigate to frontend directory
cd react-blog-frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:3000" > .env

# Start development server
npm run dev
```

Visit http://localhost:5173 in your browser.

### 1.2 Backend Setup & Test

```bash
# Navigate to backend directory
cd python-blog-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
FLASK_ENV=development
FLASK_DEBUG=True
PORT=3000
JWT_SECRET=dev_secret_key_change_this
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
BASE_URL=http://localhost:3000
EOF

# Run development server
python app.py
```

Backend will run at http://localhost:3000

### 1.3 Test the Integration

1. Open http://localhost:5173 in browser
2. Try to create an account
3. Try to create a post
4. Check that API calls work (check browser DevTools > Network tab)

---

## Part 2: Deploy Backend

### Choose Your Platform

#### Option A: Render (Recommended for Beginners)

**Steps:**

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Select `python-blog-backend` as root directory
5. Configure:
   - **Name:** blog-api
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
6. Add environment variables:
   ```
   FLASK_ENV=production
   JWT_SECRET=your_super_secret_key_here
   ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,https://www.your-frontend-domain.vercel.app
   BASE_URL=https://blog-api-xxxxx.onrender.com
   ```
7. Click "Create Web Service"
8. Wait for deployment (2-3 minutes)
9. Copy the deployed URL (e.g., https://blog-api-xxxxx.onrender.com)

#### Option B: Railway

**Steps:**

1. Go to https://railway.app and sign up
2. Click "Start a New Project"
3. Select "Deploy from GitHub"
4. Choose your repository
5. Select `python-blog-backend` directory
6. Click "Add Variables" and add:
   ```
   FLASK_ENV=production
   JWT_SECRET=your_super_secret_key_here
   ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
   BASE_URL=<your-railway-domain>
   PORT=3000
   ```
7. Deploy and get URL

#### Option C: Heroku Alternative (PythonAnywhere, Linode, etc.)

Similar process - follow their documentation

---

## Part 3: Deploy Frontend to Vercel

### 3.1 Deploy via GitHub

1. Go to https://vercel.com and sign up (use GitHub)
2. Click "Add New..." → "Project"
3. Select your `blog_web` repository
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `react-blog-frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. **Environment Variables:**
   - Click "Add Another" 
   - Add: `VITE_API_URL=https://your-backend-url.com`
   - Example: `VITE_API_URL=https://blog-api-xxxxx.onrender.com`
6. Click "Deploy"
7. Wait for deployment (1-2 minutes)

### 3.2 Get Your Frontend URL

After deployment, Vercel will provide a URL like:
```
https://blog-web-7788hmi.vercel.app
```

---

## Part 4: Final Configuration

### 4.1 Update Backend CORS

Go back to your backend hosting:
- Update `ALLOWED_ORIGINS` to include your frontend URL:
  ```
  ALLOWED_ORIGINS=https://blog-web-7788hmi.vercel.app,https://www.blog-web-7788hmi.vercel.app
  ```
- Redeploy backend

### 4.2 Install Gunicorn for Production

Update `python-blog-backend/requirements.txt`:
```txt
Flask==3.0.0
Flask-Cors==3.0.10
PyJWT==2.7.0
bcrypt==4.0.1
python-dotenv==1.0.0
Werkzeug==3.0.0
gunicorn==21.2.0
```

### 4.3 Create Procfile for Production

Create `python-blog-backend/Procfile`:
```
web: gunicorn app:app
```

---

## Part 5: Testing Production Deployment

1. Visit your Vercel frontend URL
2. Try signing up
3. Try creating a post
4. Check DevTools Network tab for API calls
5. Verify API calls go to correct backend URL

---

## Part 6: Custom Domain (Optional)

### Frontend Custom Domain:
1. In Vercel Dashboard → Project Settings → Domains
2. Add your custom domain
3. Update DNS records as shown

### Backend Custom Domain:
1. In Render/Railway → Project Settings
2. Add custom domain
3. Update DNS records

---

## Troubleshooting

### Frontend shows blank page
- Check browser console for errors (F12)
- Verify `VITE_API_URL` in Vercel dashboard
- Check if backend is running

### API calls fail with CORS error
- Check backend's `ALLOWED_ORIGINS` includes frontend URL
- Make sure to include `https://` protocol
- Include both with and without `www`

### Images/uploads not loading
- Uploads currently use local filesystem
- For production, use cloud storage (S3, Cloudinary)
- Or ensure backend persistent storage

### Database empty after deployment
- SQLite doesn't persist on ephemeral filesystems
- Upgrade to PostgreSQL or MongoDB
- See "Database Setup" section below

---

## Database Setup (Optional but Recommended)

### Use PostgreSQL instead of SQLite

1. Choose provider:
   - Render Free Database (included)
   - AWS RDS
   - DigitalOcean
   - Railway

2. Get connection string: `postgresql://user:password@host:5432/dbname`

3. Update backend to use PostgreSQL:
   - Install: `pip install psycopg2-binary sqlalchemy`
   - Update `app.py` to use PostgreSQL instead of SQLite
   - Update `.env`: `DATABASE_URL=your-postgres-connection-string`

---

## Environment Variables Reference

### Frontend (Vercel Dashboard)
```
VITE_API_URL=https://your-backend-domain.com
```

### Backend (Render/Railway Dashboard)
```
FLASK_ENV=production
FLASK_DEBUG=False
PORT=3000
JWT_SECRET=your_very_secure_secret_key_here
ALLOWED_ORIGINS=https://your-frontend.vercel.app
BASE_URL=https://your-backend-domain.com
```

---

## Success Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed to Vercel
- [ ] VITE_API_URL set in Vercel
- [ ] Backend ALLOWED_ORIGINS includes frontend URL
- [ ] Can sign up on production site
- [ ] Can create posts on production site
- [ ] Images upload successfully
- [ ] All features work without console errors

---

## Next Steps

1. **Improve File Uploads:** Move to AWS S3 or Cloudinary
2. **Add Database:** Use PostgreSQL for persistent data
3. **Add Email:** Send verification emails (SendGrid, Mailgun)
4. **Monitoring:** Set up error tracking (Sentry)
5. **Security:** Add rate limiting, input validation
6. **Performance:** Add caching, CDN

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Flask Docs: https://flask.palletsprojects.com
- React Docs: https://react.dev

Happy Deploying! 🚀

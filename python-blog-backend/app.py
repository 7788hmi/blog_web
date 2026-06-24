
import os
import sqlite3
from flask import Flask, request, jsonify, send_from_directory, g
from flask_cors import CORS
import bcrypt
import jwt
from functools import wraps
from dotenv import load_dotenv
from werkzeug.utils import secure_filename

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:3000"]}})

app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
# Ensure the uploads folder exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

JWT_SECRET = os.getenv('JWT_SECRET', 'your_jwt_secret')
DATABASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'blog.db')

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.executescript('''
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role INTEGER NOT NULL DEFAULT 2
        );
        CREATE TABLE IF NOT EXISTS Categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            created_by INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS Posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            category_id INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (category_id) REFERENCES Categories(id)
        );
        CREATE TABLE IF NOT EXISTS Files (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            file_url TEXT NOT NULL,
            post_id INTEGER,
            FOREIGN KEY (post_id) REFERENCES Posts(id)
        );
        ''')
        db.commit()

def authenticate_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'message': 'Token is missing!'}), 401
        token = auth_header
        if auth_header.startswith('Bearer '):
            token = auth_header[7:]  # Remove 'Bearer ' prefix
        try:
            data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            request.user = data
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 403
        return f(*args, **kwargs)
    return decorated

@app.route('/')
def home():
    return "Server is running perfectly", 200

@app.route('/Users', methods=['GET'])
def get_users():
    try:
        db = get_db()
        cursor = db.execute('SELECT * FROM Users')
        results = [dict(row) for row in cursor.fetchall()]
        return jsonify({'status': True, 'data': results, 'message': 'Users fetched successfully'}), 200
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)}), 500

@app.route('/posts', methods=['POST'])
@authenticate_token
def create_post():
    data = request.json
    title = data.get('title')
    content = data.get('content')
    category_id = data.get('category_id')
    file_id = data.get('fileId')

    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute('INSERT INTO Posts (title, content, category_id) VALUES (?, ?, ?)', (title, content, category_id))
        post_id = cursor.lastrowid
        if file_id:
            cursor.execute('UPDATE Files SET post_id = ? WHERE id = ?', (post_id, file_id))
        db.commit()
        return jsonify({'status': True, 'data': {'postId': post_id}, 'message': 'Post created successfully'}), 201
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)}), 500

@app.route('/posts', methods=['GET'])
def get_posts():
    page = int(request.args.get('page', 1))
    q = request.args.get('q', '')
    category_id = request.args.get('categoryId', None)
    page_size = 10
    offset = (page - 1) * page_size

    try:
        db = get_db()
        like_q = f"%{q}%"
        if category_id:
            query = """
                SELECT Posts.*, Files.file_url as featuredImage
                FROM Posts
                LEFT JOIN Files ON Posts.id = Files.post_id
                WHERE (Posts.title LIKE ? OR Posts.content LIKE ?) AND Posts.category_id = ?
                ORDER BY Posts.created_at DESC
                LIMIT ? OFFSET ?
            """
            cursor = db.execute(query, (like_q, like_q, category_id, page_size, offset))
            count_query = "SELECT COUNT(*) as count FROM Posts WHERE (title LIKE ? OR content LIKE ?) AND category_id = ?"
            count_cursor = db.execute(count_query, (like_q, like_q, category_id))
        else:
            query = """
                SELECT Posts.*, Files.file_url as featuredImage
                FROM Posts
                LEFT JOIN Files ON Posts.id = Files.post_id
                WHERE Posts.title LIKE ? OR Posts.content LIKE ?
                ORDER BY Posts.created_at DESC
                LIMIT ? OFFSET ?
            """
            cursor = db.execute(query, (like_q, like_q, page_size, offset))
            count_query = "SELECT COUNT(*) as count FROM Posts WHERE title LIKE ? OR content LIKE ?"
            count_cursor = db.execute(count_query, (like_q, like_q))

        posts = [dict(row) for row in cursor.fetchall()]
        count_result = count_cursor.fetchone()
        total_pages = (count_result['count'] + page_size - 1) // page_size

        return jsonify({'status': True, 'data': {'posts': posts, 'pages': total_pages}, 'message': 'Posts fetched successfully'}), 200
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)}), 500

@app.route('/Files', methods=['GET'])
def get_files():
    try:
        db = get_db()
        cursor = db.execute('SELECT * FROM Files')
        results = [dict(row) for row in cursor.fetchall()]
        return jsonify({'status': True, 'data': results, 'message': 'Files fetched successfully'}), 200
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)}), 500

@app.route('/categories', methods=['GET'])
def get_categories():
    try:
        db = get_db()
        cursor = db.execute('SELECT * FROM Categories')
        results = [dict(row) for row in cursor.fetchall()]
        return jsonify({'status': True, 'data': results, 'message': 'Categories fetched successfully'}), 200
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)}), 500

@app.route('/category', methods=['GET'])
def get_categories_paginated():
    page = int(request.args.get('page', 1))
    q = request.args.get('q', '')
    page_size = 10
    offset = (page - 1) * page_size

    try:
        db = get_db()
        like_q = f"%{q}%"
        query = """
            SELECT * FROM Categories
            WHERE title LIKE ?
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        """
        cursor = db.execute(query, (like_q, page_size, offset))
        categories = [dict(row) for row in cursor.fetchall()]

        count_query = "SELECT COUNT(*) as count FROM Categories WHERE title LIKE ?"
        cursor = db.execute(count_query, (like_q,))
        count_result = cursor.fetchone()
        total_pages = (count_result['count'] + page_size - 1) // page_size

        return jsonify({'status': True, 'data': {'categories': categories, 'pages': total_pages}, 'message': 'Categories fetched successfully'}), 200
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)}), 500

@app.route('/posts/<int:id>', methods=['GET'])
def get_post(id):
    try:
        db = get_db()
        query = """
            SELECT Posts.*, Categories.title AS categoryTitle, Files.file_url
            FROM Posts
            LEFT JOIN Categories ON Posts.category_id = Categories.id
            LEFT JOIN Files ON Posts.id = Files.post_id
            WHERE Posts.id = ?
        """
        cursor = db.execute(query, (id,))
        result = cursor.fetchone()
        if result:
            return jsonify({'status': True, 'data': dict(result), 'message': 'Post fetched successfully'}), 200
        else:
            return jsonify({'status': False, 'message': 'Post not found'}), 404
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)}), 500

@app.route('/posts/<int:id>', methods=['DELETE'])
@authenticate_token
def delete_post(id):
    try:
        db = get_db()
        cursor = db.execute('SELECT file_url FROM Files WHERE post_id = ?', (id,))
        files = cursor.fetchall()
        for file in files:
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], os.path.basename(file['file_url']))
            if os.path.exists(file_path):
                os.remove(file_path)
        db.execute('DELETE FROM Files WHERE post_id = ?', (id,))
        db.execute('DELETE FROM Posts WHERE id = ?', (id,))
        db.commit()
        return jsonify({'status': True, 'message': 'Post and associated files deleted successfully'}), 200
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)}), 500

@app.route('/posts/<int:id>', methods=['PUT'])
@authenticate_token
def update_post(id):
    data = request.json
    title = data.get('title')
    content = data.get('content')
    category_id = data.get('category_id')

    try:
        db = get_db()
        db.execute('UPDATE Posts SET title = ?, content = ?, category_id = ? WHERE id = ?',
                   (title, content, category_id, id))
        db.commit()
        return jsonify({'status': True, 'message': 'Post updated successfully'}), 200
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)}), 500

@app.route('/categories', methods=['POST'])
def create_category():
    data = request.json
    title = data.get('title')
    description = data.get('description')
    try:
        db = get_db()
        db.execute('INSERT INTO Categories (title, description, created_by) VALUES (?, ?, ?)', (title, description, None))
        db.commit()
        return jsonify({'status': True, 'message': 'Category created successfully'}), 201
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)}), 500

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    try:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        db = get_db()
        db.execute('INSERT INTO Users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', (name, email, hashed_password, 2))
        db.commit()
        return jsonify({'status': True, 'message': 'User registered successfully'}), 201
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    try:
        db = get_db()
        cursor = db.execute('SELECT * FROM Users WHERE email = ? LIMIT 1', (email,))
        user = cursor.fetchone()
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password_hash']):
            token = jwt.encode({'userId': user['id']}, JWT_SECRET, algorithm="HS256")
            return jsonify({'status': True, 'data': {'token': token}, 'message': 'Login successful'}), 200
        else:
            return jsonify({'status': False, 'message': 'Invalid email or password'}), 401
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)}), 500

@app.route('/category/<int:id>', methods=['DELETE'])
def delete_category(id):
    try:
        db = get_db()
        db.execute('DELETE FROM Categories WHERE id = ?', (id,))
        db.commit()
        return jsonify({'status': True, 'message': 'Category deleted successfully'}), 200
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)}), 500

@app.route('/file/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({'status': False, 'message': 'No files were uploaded.'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'status': False, 'message': 'No selected file.'}), 400
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    try:
        file_url = f"{request.scheme}://{request.host}/uploads/{filename}"
        db = get_db()
        cursor = db.execute('INSERT INTO Files (file_url) VALUES (?)', (file_url,))
        file_id = cursor.lastrowid
        db.commit()
        return jsonify({'status': True, 'data': {'id': file_id, 'fileUrl': file_url}, 'message': 'File uploaded successfully'}), 200
    except Exception as e:
        return jsonify({'status': False, 'message': str(e)}), 500

@app.route('/uploads/<path:filename>')
def serve_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    init_db()
    app.run(port=3000, debug=True)

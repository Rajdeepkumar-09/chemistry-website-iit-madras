from flask import Blueprint, request, jsonify
from app.models.database import db, User, FacultyProfile, StudentProfile
from app.core.logger import app_logger
from flask_jwt_extended import create_access_token

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role') # 'admin', 'faculty', 'student', or 'lab_manager'
    
    # 1. Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User with this email already exists"}), 400
        
    # 2. Create the core User identity
    new_user = User(email=email, role=role)
    new_user.set_password(password) # This automatically scrambles the password!
    
    db.session.add(new_user)
    db.session.commit() # Commit right now so SQLite generates a unique ID for them
    
    # 3. Create the specific Profile based on their role
    if role == 'faculty':
        profile = FacultyProfile(
            user_id=new_user.id, # The magic bridge connecting the tables!
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            title=data.get('title', 'Prof.'),
            room_number=data.get('room_number', 'TBD')
        )
        db.session.add(profile)
        
    elif role == 'student':
        profile = StudentProfile(
            user_id=new_user.id, # The magic bridge
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            roll_number=data.get('roll_number'),
            program=data.get('program', 'BS Chemistry'),
            year_of_study=data.get('year_of_study', 1)
        )
        db.session.add(profile)
        
    db.session.commit()
    app_logger.info(f"Successfully registered new {role}: {email}")
    
    return jsonify({"message": f"{role.capitalize()} registered successfully!"}), 201


@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    
    if user and user.check_password(password):
        
        # FIXED: Make identity a string, and put the rest in 'additional_claims'
        access_token = create_access_token(
            identity=str(user.id), 
            additional_claims={"role": user.role, "email": user.email}
        )
        
        app_logger.info(f"Successful login for {user.role}: {email}")
        
        return jsonify({
            "message": "Login successful!",
            "access_token": access_token,
            "role": user.role
        }), 200
        
    app_logger.warning(f"Failed login attempt for email: {email}")
    return jsonify({"error": "Invalid email or password"}), 401
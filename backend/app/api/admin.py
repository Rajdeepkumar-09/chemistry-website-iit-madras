from flask import Blueprint, jsonify, request
from app.models.database import db, User, FacultyProfile, StudentProfile
from app.core.logger import app_logger
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

bp = Blueprint('admin', __name__, url_prefix='/api/admin')

# --- HELPER SECURITY FUNCTION ---
def require_admin():
    """Ensures only the Super Admin can access these routes."""
    claims = get_jwt()
    if claims.get('role') != 'admin':
        return False
    return True

# ---------------------------------------------------------
# 1. GET ALL USERS (For the Data Grid)
# ---------------------------------------------------------
@bp.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    if not require_admin():
        return jsonify({"error": "Unauthorized. Admin access required."}), 403

    users = User.query.all()
    user_list = []

    for user in users:
        # Base user data from the Vault
        user_data = {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
            "name": "N/A", # Default
            "details": "No profile created yet." # Default
        }

        # If they are Faculty, fetch their specific data
        if user.role == 'faculty' and user.faculty_profile:
            profile = user.faculty_profile
            user_data["name"] = f"{profile.title} {profile.first_name} {profile.last_name}"
            user_data["details"] = f"Designation: {profile.designation} | Lab: {profile.lab_name}"

        # If they are a Student, fetch their specific data
        elif user.role == 'student' and user.student_profile:
            profile = user.student_profile
            user_data["name"] = f"{profile.first_name} {profile.last_name}"
            user_data["details"] = f"Roll No: {profile.roll_number} | Program: {profile.program}"

        user_list.append(user_data)

    return jsonify(user_list), 200

# ---------------------------------------------------------
# 2. THE KILL SWITCH (Suspend/Activate User)
# ---------------------------------------------------------
@bp.route('/users/<int:user_id>/toggle-status', methods=['PUT'])
@jwt_required()
def toggle_user_status(user_id):
    if not require_admin():
        return jsonify({"error": "Unauthorized. Admin access required."}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found."}), 404
        
    # Prevent the admin from suspending themselves!
    current_admin_id = get_jwt_identity()
    if str(user.id) == str(current_admin_id):
         return jsonify({"error": "You cannot suspend your own admin account!"}), 400

    # Flip the switch!
    user.is_active = not user.is_active
    db.session.commit()

    status_str = "Activated" if user.is_active else "Suspended"
    app_logger.info(f"Admin toggled User ID {user_id} status to {status_str}.")
    
    return jsonify({"message": f"User account has been {status_str}.", "is_active": user.is_active}), 200

# ---------------------------------------------------------
# 3. REGISTER NEW USER (Creates base User + Profile)
# ---------------------------------------------------------
@bp.route('/users', methods=['POST'])
@jwt_required()
def create_user():
    if not require_admin():
        return jsonify({"error": "Unauthorized. Admin access required."}), 403

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    if not email or not password or not role:
        return jsonify({"error": "Missing required fields."}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User with this email already exists."}), 400

    try:
        # 1. Create the Master User Account
        new_user = User(email=email, role=role)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.flush() # This gets the new_user.id before committing

        # 2. Build the Specific Profile based on the Role
        if role == 'student':
            profile = StudentProfile(
                user_id=new_user.id,
                first_name=data.get('first_name', ''),
                last_name=data.get('last_name', ''),
                roll_number=data.get('roll_number', ''),
                program=data.get('program', 'BS')
            )
            db.session.add(profile)
            
        elif role == 'faculty':
            profile = FacultyProfile(
                user_id=new_user.id,
                first_name=data.get('first_name', ''),
                last_name=data.get('last_name', ''),
                title=data.get('title', 'Prof.'),
                designation=data.get('designation', '')
            )
            db.session.add(profile)

        # 3. Save everything!
        db.session.commit()
        app_logger.info(f"Admin created a new {role} account: {email}")
        return jsonify({"message": f"{role.capitalize()} created successfully!"}), 201

    except Exception as e:
        db.session.rollback()
        app_logger.error(f"Error creating user: {str(e)}")
        return jsonify({"error": "Database error while creating user."}), 500
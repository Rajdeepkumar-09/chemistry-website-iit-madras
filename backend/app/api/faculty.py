from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.database import db, User, Notice
from app.core.logger import app_logger
from datetime import datetime

bp = Blueprint('faculty', __name__, url_prefix='/api/faculty')

# ---------------------------------------------------------
# 1. GET FACULTY PROFILE & COURSES
# ---------------------------------------------------------
@bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user or user.role != 'faculty':
        return jsonify({"error": "Unauthorized. Faculty portal only."}), 403
        
    profile = user.faculty_profile
    if not profile:
        return jsonify({"error": "Faculty profile not found."}), 404
        
    # NEW: Fetch courses using the Many-to-Many relationship you built!
    my_courses = [{"code": c.course_code, "name": c.course_name} for c in profile.courses]
        
    return jsonify({
        "name": f"{profile.title} {profile.first_name} {profile.last_name}",
        "designation": profile.designation,
        "research_areas": profile.research_areas or "Not specified",
        "office_room": profile.office_room or "TBA",
        "courses": my_courses # Send the courses array to React!
    }), 200

# ---------------------------------------------------------
# 2. PUBLISH NEW NOTICE (UPGRADED)
# ---------------------------------------------------------
@bp.route('/publish-notice', methods=['POST'])
@jwt_required()
def publish_notice():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user or user.role != 'faculty':
        return jsonify({"error": "Unauthorized. Only faculty can post notices."}), 403
        
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    deadline_str = data.get('deadline') # NEW: Grab the deadline from React!
    
    if not title or not content:
        return jsonify({"error": "Title and content are required."}), 400
        
    # FIX 1: Add the First Name to the Author String
    author_name = f"{user.faculty_profile.title} {user.faculty_profile.first_name} {user.faculty_profile.last_name}" if user.faculty_profile else "Faculty"
    
    # FIX 2: Process the Deadline Date
    parsed_deadline = None
    if deadline_str:
        try:
            parsed_deadline = datetime.strptime(deadline_str, '%Y-%m-%d')
        except ValueError:
            pass
            
    new_notice = Notice(
        title=title,
        content=content,
        author=author_name,
        deadline=parsed_deadline, # Save it to the database!
        user_id=user.id
    )
    db.session.add(new_notice)
    db.session.commit()
    
    app_logger.info(f"Notice published by {author_name}")
    return jsonify({"message": "Notice published successfully!"}), 201
from flask import Blueprint, jsonify, request
from app.models.database import db, Notice, FacultyProfile
from app.core.logger import app_logger
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from datetime import datetime

bp = Blueprint('notices', __name__, url_prefix='/api/notices')

@bp.route('', methods=['GET'])
def get_notices():
    # FIXED: Use local time to check against the deadline!
    now = datetime.now()
    
    active_notices = Notice.query.filter(
        (Notice.deadline == None) | (Notice.deadline >= now)
    ).order_by(Notice.created_at.desc()).all()
    
    return jsonify([notice.to_dict() for notice in active_notices])

@bp.route('', methods=['POST'])
@jwt_required()
def create_notice():
    user_id = get_jwt_identity()
    claims = get_jwt()
    user_role = claims.get('role')

    allowed_roles = ['admin', 'faculty', 'lab_manager']
    if user_role not in allowed_roles:
        return jsonify({"error": "Access Denied: Students cannot post notices."}), 403

    # AUTOMATED AUTHOR NAME LOGIC!
    author_name = "Department Staff"
    if user_role == 'admin':
        author_name = "System Admin"
    elif user_role == 'faculty':
        # Look up the professor in the database!
        profile = FacultyProfile.query.filter_by(user_id=int(user_id)).first()
        if profile:
            author_name = f"{profile.title} {profile.last_name}" # e.g., "Prof. Sharma"

    data = request.get_json()
    
    # Process the deadline from React
    deadline_str = data.get('deadline')
    deadline_dt = None
    if deadline_str:
        deadline_dt = datetime.fromisoformat(deadline_str)

    new_notice = Notice(
        title=data.get('title'),
        content=data.get('content'),
        author=author_name, # Python sets this securely now!
        user_id=int(user_id),
        deadline=deadline_dt # Save the deadline!
    )
    
    db.session.add(new_notice)
    db.session.commit()
    
    app_logger.info(f"Notice created by {author_name} (ID: {user_id})")
    return jsonify(new_notice.to_dict()), 201
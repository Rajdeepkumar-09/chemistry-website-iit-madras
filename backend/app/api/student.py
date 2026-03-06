from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.database import User

bp = Blueprint('student', __name__, url_prefix='/api/student')

@bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    # 1. Who is asking? Get their ID from the secure token
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    # 2. Security Check
    if not user or user.role != 'student':
        return jsonify({"error": "Unauthorized access. Student portal only."}), 403
        
    profile = user.student_profile
    if not profile:
        return jsonify({"error": "Academic profile not found."}), 404
        
    # 3. Package the data and send it to React!
    return jsonify({
        "name": f"{profile.first_name} {profile.last_name}",
        "rollNumber": profile.roll_number,
        "program": profile.program,
        "semester": profile.current_semester or 1 # Defaults to 1 if brand new
    }), 200
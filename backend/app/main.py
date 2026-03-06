import os
from flask_jwt_extended import JWTManager
from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate

from app.core.config import config_by_name
from app.core.logger import app_logger
from app.core.exceptions import register_error_handlers, ResourceNotFoundError
from app.models.database import db

app = Flask(__name__)
# This handles all the OPTIONS requests automatically!
CORS(app)

# Load the Configuration
app.config.from_object(config_by_name['dev'])
app.config['JWT_SECRET_KEY'] = 'super-secret-iitm-chemistry-key!' 
jwt = JWTManager(app)

# Initialize Database
db.init_app(app)
migrate = Migrate(app, db)

# ==========================================
# THE FOOLPROOF AUTO-BUILDER
# ==========================================
with app.app_context():
    from app.models.database import User, FacultyProfile, StudentProfile, Notice, Course
    db.create_all()
    
    admin_exists = User.query.filter_by(role='admin').first()
    if not admin_exists:
        super_admin = User(email='admin@smail.iitm.ac.in', role='admin', is_active=True)
        super_admin.set_password('admin123')
        db.session.add(super_admin)
        db.session.commit()
        app_logger.info("✅ Super Admin account generated automatically on boot!")

register_error_handlers(app)
app_logger.info("Chemistry Department Server initialized successfully.")

# ==========================================
# ALL API BLUEPRINTS (THE PIPES)
# ==========================================
from app.api import notices
app.register_blueprint(notices.bp)

from app.api import auth
app.register_blueprint(auth.bp)

from app.api import admin
app.register_blueprint(admin.bp)

from app.api import student
app.register_blueprint(student.bp)

# THE MISSING PIPE IS NOW PLUGGED IN!
from app.api import faculty
app.register_blueprint(faculty.bp)

# ==========================================

@app.route("/api/test-error", methods=["GET"])
def test_error():
    app_logger.warning("Someone triggered the test error route!")
    raise ResourceNotFoundError("Chemical Database")

if __name__ == "__main__":
    app.run(port=8000, debug=True)
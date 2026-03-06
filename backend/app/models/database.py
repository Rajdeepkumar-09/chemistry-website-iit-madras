from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

# ==========================================
# BRIDGE TABLES (Many-to-Many Relationships)
# ==========================================
enrollments = db.Table('enrollments',
    db.Column('student_id', db.Integer, db.ForeignKey('student_profiles.id'), primary_key=True),
    db.Column('course_id', db.Integer, db.ForeignKey('courses.id'), primary_key=True)
)

teaching_assignments = db.Table('teaching_assignments',
    db.Column('faculty_id', db.Integer, db.ForeignKey('faculty_profiles.id'), primary_key=True),
    db.Column('course_id', db.Integer, db.ForeignKey('courses.id'), primary_key=True)
)

# ==========================================
# TABLE 1: THE VAULT (Users & Security)
# ==========================================
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), nullable=False) # 'admin', 'faculty', 'student'
    
    # NEW: The Kill Switch! Admin can disable users without deleting them.
    is_active = db.Column(db.Boolean, default=True) 
    
    # Links to profiles
    faculty_profile = db.relationship('FacultyProfile', backref='user', uselist=False, cascade="all, delete-orphan")
    student_profile = db.relationship('StudentProfile', backref='user', uselist=False, cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# ==========================================
# TABLE 2: FACULTY PROFILES (For Public Site)
# ==========================================
class FacultyProfile(db.Model):
    __tablename__ = 'faculty_profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    title = db.Column(db.String(20)) # Prof, Dr.
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    designation = db.Column(db.String(100)) # e.g., Assistant Professor
    office_room = db.Column(db.String(50))
    phone_ext = db.Column(db.String(20))
    research_areas = db.Column(db.Text) # e.g., "Organic Synthesis, Catalysis"
    lab_name = db.Column(db.String(100))
    profile_picture_url = db.Column(db.String(255))
    
    # Relationships
    courses = db.relationship('Course', secondary=teaching_assignments, backref=db.backref('instructors', lazy='dynamic'))
    advised_students = db.relationship('StudentProfile', backref='advisor', lazy='dynamic')

    def to_dict(self):
        return {
            "id": self.id,
            "name": f"{self.title} {self.first_name} {self.last_name}",
            "designation": self.designation,
            "research_areas": self.research_areas,
            "office_room": self.office_room
        }

# ==========================================
# TABLE 3: STUDENT PROFILES (Academic Data)
# ==========================================
class StudentProfile(db.Model):
    __tablename__ = 'student_profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    roll_number = db.Column(db.String(20), unique=True, nullable=False) # e.g., CY26B001
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    program = db.Column(db.String(50)) # BS, MSc, PhD
    current_semester = db.Column(db.Integer)
    expected_graduation_year = db.Column(db.Integer)
    
    # Links to Professor guiding them
    advisor_id = db.Column(db.Integer, db.ForeignKey('faculty_profiles.id'), nullable=True)
    
    # Relationships
    courses = db.relationship('Course', secondary=enrollments, backref=db.backref('students', lazy='dynamic'))

    def to_dict(self):
        return {
            "id": self.id,
            "roll_number": self.roll_number,
            "name": f"{self.first_name} {self.last_name}",
            "program": self.program,
            "semester": self.current_semester
        }

# ==========================================
# TABLE 4: COURSES (The Curriculum)
# ==========================================
class Course(db.Model):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    course_code = db.Column(db.String(20), unique=True, nullable=False) # e.g., CY1010
    course_name = db.Column(db.String(150), nullable=False)
    credits = db.Column(db.Integer)

    def to_dict(self):
        return {
            "id": self.id,
            "course_code": self.course_code,
            "course_name": self.course_name,
            "credits": self.credits
        }

# ==========================================
# TABLE 5: NOTICES (From Phase 1)
# ==========================================
class Notice(db.Model):
    __tablename__ = 'notices'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(50), nullable=False) 
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True) 
    created_at = db.Column(db.DateTime, default=datetime.now)
    deadline = db.Column(db.DateTime, nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'author': self.author,
            'date': self.created_at.strftime('%Y-%m-%d %I:%M %p'),
            'deadline': self.deadline.strftime('%Y-%m-%d %I:%M %p') if self.deadline else None
        }
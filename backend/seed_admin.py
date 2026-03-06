from app.main import app
from app.models.database import db, User

with app.app_context():

    # 2. Check if an admin already exists
    admin = User.query.filter_by(role='admin').first()
    
    if not admin:
        print("Creating Super Admin account...")
        super_admin = User(email='admin@smail.iitm.ac.in', role='admin', is_active=True)
        super_admin.set_password('admin123')
        db.session.add(super_admin)
        db.session.commit()
        print("✅ Super Admin account successfully generated!")
    else:
        print("⚡ Admin already exists.")
from app.main import app
from app.models.database import db, User

with app.app_context():
    print("🧹 1. Clearing out any corrupted data...")
    db.drop_all()
    
    print("🏗️ 2. Forcing Python to build the fresh tables...")
    db.create_all()
    
    print("👑 3. Spawning the Super Admin account...")
    admin = User.query.filter_by(role='admin').first()
    
    if not admin:
        super_admin = User(email='admin@smail.iitm.ac.in', role='admin', is_active=True)
        super_admin.set_password('admin123')
        db.session.add(super_admin)
        db.session.commit()
        print("✅ VICTORY! The database is fully armed and operational.")
    else:
        print("⚡ Admin already exists.")
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from config import Config
from app.models import db
from app.utils.seed import seed_demo_data

jwt = JWTManager()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

    # Register blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.resume_routes import resume_bp
    from app.routes.job_routes import job_bp
    from app.routes.skill_routes import skill_bp
    from app.routes.roadmap_routes import roadmap_bp
    from app.routes.interview_routes import interview_bp
    from app.routes.assistant_routes import assistant_bp
    from app.routes.dashboard_routes import dashboard_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(resume_bp)
    app.register_blueprint(job_bp)
    app.register_blueprint(skill_bp)
    app.register_blueprint(roadmap_bp)
    app.register_blueprint(interview_bp)
    app.register_blueprint(assistant_bp)
    app.register_blueprint(dashboard_bp)

    @app.route('/api/health')
    def health():
        return jsonify({
            'status': 'healthy',
            'app': 'CareerIQ API',
            'version': '1.0.0'
        }), 200

    # Ensure tables exist and seed demo records
    with app.app_context():
        db.create_all()
        try:
            seed_demo_data()
        except Exception as e:
            print(f"[App Init] Seed notice: {e}")

    return app

from sqlalchemy import create_engine, text

DATABASE_URL = "postgresql://neondb_owner:npg_8WXekF1PzhTi@ep-plain-sound-aejk2y07-pooler.c-2.us-east-2.aws.neon.tech/indoresamadhan?sslmode=require&channel_binding=require"

engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    result = conn.execute(text("SELECT now();"))
    print(result.fetchone())

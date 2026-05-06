# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.openapi.utils import get_openapi
# from app.routes import auth, appointments, admin

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(auth.router, prefix="/auth", tags=["Auth"])
# app.include_router(appointments.router, prefix="/appointments", tags=["Appointments"])
# app.include_router(admin.router, prefix="/admin", tags=["Admin"])


# # 🔐 Swagger JWT support
# def custom_openapi():
#     if app.openapi_schema:
#         return app.openapi_schema

#     openapi_schema = get_openapi(
#         title="Hospital API",
#         version="1.0.0",
#         description="AI Hospital System",
#         routes=app.routes,
#     )

#     openapi_schema["components"]["securitySchemes"] = {
#         "BearerAuth": {
#             "type": "http",
#             "scheme": "bearer",
#             "bearerFormat": "JWT"
#         }
#     }

#     openapi_schema["security"] = [{"BearerAuth": []}]

#     app.openapi_schema = openapi_schema
#     return app.openapi_schema


# app.openapi = custom_openapi


# @app.get("/")
# def home():
#     return {"message": "Hospital API Running"}






# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.openapi.utils import get_openapi
# from app.routes import auth, appointments, admin
# from app.startup import create_default_admin

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(auth.router, prefix="/auth", tags=["Auth"])
# app.include_router(appointments.router, prefix="/appointments", tags=["Appointments"])
# app.include_router(admin.router, prefix="/admin", tags=["Admin"])


# # 🔐 Swagger JWT config
# def custom_openapi():
#     if app.openapi_schema:
#         return app.openapi_schema

#     openapi_schema = get_openapi(
#         title="Hospital API",
#         version="1.0.0",
#         description="AI Hospital System",
#         routes=app.routes,
#     )

#     openapi_schema["components"]["securitySchemes"] = {
#         "BearerAuth": {
#             "type": "http",
#             "scheme": "bearer",
#             "bearerFormat": "JWT"
#         }
#     }

#     openapi_schema["security"] = [{"BearerAuth": []}]

#     app.openapi_schema = openapi_schema
#     return app.openapi_schema


# app.openapi = custom_openapi


# @app.on_event("startup")
# async def startup_event():
#     await create_default_admin()


# @app.get("/")
# def home():
#     return {"message": "Hospital API Running"}


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from app.routes import auth, appointments, admin, announcements , feedback  # ✅ ADDED
from app.startup import create_default_admin

from app.routes import document_requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(appointments.router, prefix="/appointments", tags=["Appointments"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])

# ✅ NEW ROUTE
app.include_router(announcements.router, prefix="/announcements", tags=["Announcements"])


app.include_router(
    feedback.router,
    prefix="/feedback",
    tags=["Feedback"]
)


app.include_router(
    document_requests.router,
    prefix="/documents",
    tags=["Documents"]
)

# 🔐 Swagger JWT config
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title="Hospital API",
        version="1.0.0",
        description="AI Hospital System",
        routes=app.routes,
    )

    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }

    openapi_schema["security"] = [{"BearerAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi


@app.on_event("startup")
async def startup_event():
    await create_default_admin()


@app.get("/")
def home():
    return {"message": "Hospital API Running"}

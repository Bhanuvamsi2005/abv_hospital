# def reset_password_template(link: str):
#     return f"""
#     <div style="font-family:Arial;padding:20px">
#       <h2 style="color:#2c3e50;">Reset Your Password</h2>
#       <p>Click the button below:</p>
#       <a href="{link}" style="background:#3498db;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">
#         Reset Password
#       </a>
#       <p style="color:gray;margin-top:20px;">Valid for 15 minutes</p>
#     </div>
#     """


# def appointment_template(status: str, doctor: str, note: str):
#     return f"""
#     <div style="font-family:Arial;padding:20px">
#       <h2 style="color:#27ae60;">Appointment {status.capitalize()}</h2>
#       <p><b>Doctor:</b> {doctor}</p>
#       <p><b>Note:</b> {note}</p>
#       <p style="color:gray;">Thank you for choosing us</p>
#     </div>
#     """





def reset_password_template(link: str):

    return f"""
    <div style="
        font-family: Arial, sans-serif;
        background: #f4f7fb;
        padding: 40px 20px;
    ">

        <div style="
            max-width: 600px;
            margin: auto;
            background: white;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        ">

            <!-- HEADER -->
            <div style="
                background: linear-gradient(135deg,#2563eb,#1e40af);
                padding: 30px;
                text-align: center;
                color: white;
            ">
                <h1 style="margin:0;">
                    🏥 MediCore Hospital
                </h1>

                <p style="
                    margin-top:10px;
                    opacity:0.9;
                    font-size:14px;
                ">
                    Secure Healthcare Management System
                </p>
            </div>

            <!-- BODY -->
            <div style="padding:40px;">

                <h2 style="
                    color:#1e293b;
                    margin-bottom:15px;
                ">
                    Reset Your Password
                </h2>

                <p style="
                    color:#475569;
                    line-height:1.7;
                    margin-bottom:25px;
                ">
                    We received a request to reset your password.
                    Click the button below to create a new password.
                </p>

                <div style="text-align:center;">

                    <a href="{link}" style="
                        background:#2563eb;
                        color:white;
                        padding:14px 28px;
                        border-radius:8px;
                        text-decoration:none;
                        font-weight:bold;
                        display:inline-block;
                    ">
                        Reset Password
                    </a>

                </div>

                <p style="
                    margin-top:30px;
                    color:#64748b;
                    font-size:14px;
                ">
                    This link is valid for 15 minutes.
                </p>

                <p style="
                    color:#64748b;
                    font-size:14px;
                    line-height:1.6;
                ">
                    If you did not request this password reset,
                    you can safely ignore this email.
                </p>

            </div>

            <!-- FOOTER -->
            <div style="
                background:#f1f5f9;
                padding:20px;
                text-align:center;
                font-size:13px;
                color:#64748b;
            ">

                © 2026 MediCore Hospital <br/>
                Healthcare • Trust • Care

            </div>

        </div>

    </div>
    """


def appointment_template(status: str, doctor: str, note: str):

    # ✅ DYNAMIC COLORS
    status_color = "#16a34a" if status == "accepted" else "#dc2626"

    status_text = (
        "Appointment Accepted"
        if status == "accepted"
        else "Appointment Rejected"
    )

    status_icon = (
        "✅"
        if status == "accepted"
        else "❌"
    )

    return f"""
    <div style="
        font-family: Arial, sans-serif;
        background: #f4f7fb;
        padding: 40px 20px;
    ">

        <div style="
            max-width: 600px;
            margin: auto;
            background: white;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        ">

            <!-- HEADER -->
            <div style="
                background: linear-gradient(135deg,#2563eb,#1e40af);
                padding: 30px;
                text-align: center;
                color: white;
            ">

                <h1 style="margin:0;">
                    🏥 MediCore Hospital
                </h1>

                <p style="
                    margin-top:10px;
                    opacity:0.9;
                    font-size:14px;
                ">
                    Appointment Management System
                </p>

            </div>

            <!-- BODY -->
            <div style="padding:40px;">

                <h2 style="
                    color:{status_color};
                    margin-bottom:20px;
                    text-align:center;
                ">
                    {status_icon} {status_text}
                </h2>

                <div style="
                    background:#f8fafc;
                    border-radius:10px;
                    padding:20px;
                    margin-top:20px;
                ">

                    <p style="
                        margin:0 0 15px 0;
                        color:#334155;
                    ">
                        <b>Doctor / Staff:</b> {doctor}
                    </p>

                    <p style="
                        margin:0;
                        color:#334155;
                        line-height:1.7;
                    ">
                        <b>Note:</b><br/>
                        {note if note else "No additional note provided."}
                    </p>

                </div>

                <p style="
                    margin-top:30px;
                    color:#64748b;
                    line-height:1.7;
                ">
                    Thank you for choosing MediCore Hospital.
                    We are committed to providing quality healthcare services.
                </p>

            </div>

            <!-- FOOTER -->
            <div style="
                background:#f1f5f9;
                padding:20px;
                text-align:center;
                font-size:13px;
                color:#64748b;
            ">

                © 2026 MediCore Hospital <br/>
                Developed By: Achanta Bhanu vamsi <br/>
                Healthcare • Trust • Care

            </div>

        </div>

    </div>
    """
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# import os

# EMAIL = os.getenv("EMAIL")
# PASSWORD = os.getenv("EMAIL_PASSWORD")


# def send_email(to, subject, html):
#     try:
#         msg = MIMEMultipart()
#         msg["From"] = EMAIL
#         msg["To"] = to
#         msg["Subject"] = subject

#         msg.attach(MIMEText(html, "html"))

#         server = smtplib.SMTP("smtp.gmail.com", 587)
#         server.starttls()
#         server.login(EMAIL, PASSWORD)
#         server.sendmail(EMAIL, to, msg.as_string())
#         server.quit()

#         print("✅ Email sent to:", to)

#     except Exception as e:
#         print("❌ Email error:", e)



import resend
import os

resend.api_key = os.getenv("RESEND_API_KEY")


def send_email(to, subject, html):

    try:

        resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": to,
            "subject": subject,
            "html": html
        })

        print("✅ Email sent to:", to)

    except Exception as e:
        print("❌ Email error:", e)

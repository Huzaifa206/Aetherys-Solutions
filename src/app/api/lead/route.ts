import { NextRequest, NextResponse } from 'next/server';

const EMAILJS_SERVICE_ID  = 'service_524qpu8';
const EMAILJS_TEMPLATE_ID = 'template_0nmxvn4';
const EMAILJS_PUBLIC_KEY  = 'ze1dzhlrrqV0ayX7U';

export async function POST(req: NextRequest) {
  try {
    const lead = await req.json();

    const templateParams = {
      name: lead.name || 'Unknown',
      email: lead.email || 'Not provided',
      message: `
🤖 NEW LEAD FROM AETHERYS AI CHATBOT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Name: ${lead.name || 'N/A'}
📧 Email: ${lead.email || 'N/A'}
📞 Phone: ${lead.phone || 'N/A'}
🏢 Company: ${lead.company || 'N/A'}
🛠️ Service Needed: ${lead.service || 'N/A'}
💰 Budget: ${lead.budget || 'N/A'}
⏱️ Timeline: ${lead.timeline || 'N/A'}

📋 Project Description:
${lead.description || 'N/A'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim(),
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: templateParams,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('EmailJS error:', text);
      return NextResponse.json({ error: 'Email send failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

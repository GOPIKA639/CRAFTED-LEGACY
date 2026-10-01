# EmailJS Setup Guide

This guide will help you configure EmailJS to send contact enquiries to the admin's email automatically.

## Steps to Setup

### 1. Create an EmailJS Account
- Visit [https://www.emailjs.com/](https://www.emailjs.com/)
- Sign up for a free account (free tier is sufficient for most projects)
- Verify your email address

### 2. Add an Email Service
- Go to the **Services** section in your EmailJS dashboard
- Click **Add Service**
- Select your email provider:
  - **Gmail**: Recommended for beginners
  - **Outlook**: For corporate emails
  - **SendGrid**: For high-volume sending
  - **Other SMTP**: For custom email services

#### For Gmail:
1. Select Gmail as the service
2. Click **Connect Account**
3. Allow EmailJS to access your Gmail account
4. Name the service (e.g., `gmail_service`)
5. Click **Create Service**

### 3. Create an Email Template
- Go to **Email Templates** in your EmailJS dashboard
- Click **Create New Template**
- Set up the template with these variables:
  - `{{to_email}}` - Admin email recipient
  - `{{from_name}}` - Customer name
  - `{{from_email}}` - Customer email
  - `{{phone}}` - Customer phone
  - `{{message}}` - Enquiry message

#### Example Template Structure:
```
Subject: New Enquiry from {{from_name}}

From: {{from_name}} <{{from_email}}>
Phone: {{phone}}

Message:
{{message}}
```

- Click **Save Template**
- Copy the **Template ID** (format: `template_xxxxxxx`)

### 4. Get Your EmailJS Credentials
- In the dashboard, go to **Account** section
- Find and copy:
  - **Public Key** (format: `xxxxxxxxxxxxxxxxxxxxxxxx`)
  - **Service ID** (from Services section, format: `service_xxxxxxx`)
  - **Template ID** (from Templates section, format: `template_xxxxxxx`)

### 5. Update Your Code
Open `src/components/contact/ContactFormSection.tsx` and replace:

```typescript
// Line 1 (in useEffect):
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
// Replace with your actual Public Key:
emailjs.init('abc123def456ghi789jkl012');

// Line 2 (in handleSubmit):
'YOUR_EMAILJS_SERVICE_ID'  // Replace with your Service ID
'YOUR_EMAILJS_TEMPLATE_ID' // Replace with your Template ID
```

Example:
```typescript
emailjs.init('abc123def456ghi789jkl012');

emailjs.send(
  'service_abc123def456',
  'template_ghi789jkl012',
  {...}
);
```

### 6. Test the Integration
1. Run the development server: `npm run dev`
2. Navigate to the **Contact** page
3. Fill out the contact form and submit
4. Check your admin email inbox (and spam folder)
5. The email should arrive within a few seconds

## Features Implemented

✅ **Contact enquiries are stored locally** in `localStorage` with admin email
✅ **Email sent to admin** automatically when user submits the form
✅ **Admin panel displays** all enquiry details including admin email
✅ **Automatic timestamp** for each enquiry
✅ **User feedback** when enquiry is submitted ("Your enquiry has been submitted")

## Data Flow

```
User fills contact form
         ↓
User clicks Submit
         ↓
Enquiry stored in localStorage (with adminEmail field)
         ↓
Email sent to admin via EmailJS
         ↓
Admin can view enquiries in Admin Dashboard → Contact Panel
```

## Troubleshooting

### Email not being sent?
1. Check browser console for errors (F12 → Console)
2. Verify EmailJS credentials are correct
3. Check EmailJS dashboard for failed sends
4. Ensure email service is connected in EmailJS account

### "Missing credentials" error?
- Make sure you replaced `YOUR_EMAILJS_PUBLIC_KEY`, `YOUR_EMAILJS_SERVICE_ID`, and `YOUR_EMAILJS_TEMPLATE_ID` with actual values

### Email going to spam?
1. Add sender email to your Gmail contacts
2. Configure SPF/DKIM records (for production use)
3. Ask admin to mark email as "Not Spam"

### Enquiry stored but email not sent?
- The email sending is optional (doesn't block form submission)
- Enquiry is still saved to localStorage
- Check browser console and EmailJS dashboard for specific errors

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- Unlimited contacts
- Basic email templates

For higher limits, upgrade to a paid plan.

## Security Notes

⚠️ **Important**: The Public Key is safe to expose in frontend code. However:
- Keep your **Service ID** and **Template ID** safe
- Don't expose sensitive admin operations to frontend
- For production, consider a backend service to send emails

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- Contact EmailJS Support: https://www.emailjs.com/contact

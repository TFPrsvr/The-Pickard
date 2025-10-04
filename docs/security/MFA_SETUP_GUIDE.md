# Multi-Factor Authentication (MFA) Setup Guide

## Overview

This guide explains how to enable Multi-Factor Authentication (MFA) in Clerk for The Pickard application. MFA adds an additional security layer by requiring users to verify their identity through a second factor (SMS, authenticator app, or backup codes).

---

## Prerequisites

- Clerk account with access to The Pickard application dashboard
- Admin access to your Clerk dashboard

---

## Step 1: Access Clerk Dashboard

1. Log in to your Clerk account at [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Select **The Pickard** application from your list of applications
3. Navigate to the **User & Authentication** section in the left sidebar

---

## Step 2: Enable Multi-Factor Authentication

### For Development Environment:

1. In your Clerk dashboard, click **Multi-factor** in the User & Authentication menu
2. You'll see options for different MFA methods:
   - **SMS verification** - Users receive a code via text message
   - **Authenticator application (TOTP)** - Users scan a QR code with Google Authenticator, Authy, etc.
   - **Backup codes** - Users receive one-time backup codes for account recovery

### Recommended Settings:

**Enable the following MFA methods:**

#### 1. Authenticator Application (TOTP) - Recommended ✅
- Toggle **"Authenticator application"** to **ON**
- This allows users to use apps like:
  - Google Authenticator
  - Authy
  - Microsoft Authenticator
  - 1Password
  - Any TOTP-compatible app

**Benefits:**
- Most secure method (no reliance on SMS)
- Works offline
- Free for users
- Industry standard

#### 2. SMS Verification - Optional ⚠️
- Toggle **"SMS verification"** to **ON** if you want to offer this option
- **Note**: SMS verification requires Twilio integration and may have costs
- Less secure than authenticator apps (vulnerable to SIM swapping)

**Configuration:**
- Go to **SMS** in the left sidebar
- Connect your Twilio account or use Clerk's SMS service
- Configure SMS templates

#### 3. Backup Codes - Highly Recommended ✅
- Toggle **"Backup codes"** to **ON**
- Allows users to generate one-time recovery codes
- Essential for account recovery if they lose their authenticator device

**Benefits:**
- Account recovery mechanism
- No additional cost
- User-friendly

---

## Step 3: Configure MFA Enforcement

### Option A: Optional MFA (Recommended for Start)

- Set MFA mode to **"Optional"**
- Users can enable MFA in their account settings
- Good for gradual rollout

**Steps:**
1. In **Multi-factor** settings, find **"Multi-factor mode"**
2. Select **"Optional"**
3. Click **Save changes**

### Option B: Mandatory MFA (High Security)

- Set MFA mode to **"Mandatory"**
- All users must enable MFA to access the application
- Best for high-security applications

**Steps:**
1. In **Multi-factor** settings, find **"Multi-factor mode"**
2. Select **"Mandatory"**
3. Click **Save changes**

**⚠️ Warning:** If you enable mandatory MFA, ensure you communicate this to existing users in advance. They will be required to set up MFA on their next login.

---

## Step 4: User Experience Flow

Once MFA is enabled, users will experience the following:

### First-Time MFA Setup:

1. User logs in with email/password (or social login)
2. If MFA is mandatory or they choose to enable it:
   - They are prompted to set up MFA
   - They scan a QR code with their authenticator app
   - They enter the 6-digit code to verify setup
   - They are shown backup codes to save

### Subsequent Logins:

1. User enters email/password
2. User is prompted for MFA code
3. User opens authenticator app and enters 6-digit code
4. User gains access to the application

### Account Recovery:

- If user loses their authenticator device:
  - They can use a backup code
  - Or contact support for manual verification

---

## Step 5: Customize MFA Settings (Optional)

### Verification Code Length:
- Default: 6 digits
- Can be changed to 8 digits for higher security
- Location: **Multi-factor > Authenticator application settings**

### Code Expiration:
- Default: 30 seconds
- Standard TOTP interval
- Not recommended to change

### Backup Code Quantity:
- Default: 10 codes
- Each code is single-use
- Users can regenerate codes anytime

---

## Step 6: Test MFA Flow

**Before rolling out to production:**

1. Create a test user account
2. Enable MFA on the test account
3. Verify the setup flow works correctly:
   - QR code scans properly
   - Authenticator app generates valid codes
   - Backup codes are displayed
   - Login with MFA code works
   - Backup code login works

---

## Step 7: Production Rollout Strategy

### Recommended Approach:

**Phase 1: Optional MFA (Week 1-2)**
- Enable MFA as optional
- Add banner in application encouraging users to enable MFA
- Provide documentation/help articles

**Phase 2: Encourage Adoption (Week 3-4)**
- Email users about MFA benefits
- Offer incentives for enabling MFA (optional)
- Monitor adoption rate

**Phase 3: Mandatory MFA (Week 5+)**
- If required, announce mandatory MFA deadline
- Give users 2-4 weeks notice
- Provide support resources
- Switch to mandatory mode

---

## Integration with The Pickard Application

### Current Authorization System:

The Pickard already has role-based authorization (RBAC). MFA adds an additional security layer:

**Security Layers:**
1. ✅ Email/Password or Social Login (Clerk)
2. ✅ **MFA Verification** (New - enabled in Clerk dashboard)
3. ✅ Role-Based Access Control (Admin, Mechanic, User)
4. ✅ Permission-Based Authorization (read:parts, write:diagnostics, etc.)

### No Code Changes Required:

Clerk handles MFA automatically. No changes needed in:
- `src/lib/security/authorization.ts`
- `src/types/roles.ts`
- API routes

### Optional UI Enhancement:

You can add MFA status indicators in the user profile:

```typescript
// In user profile component
import { useUser } from '@clerk/nextjs';

export function UserProfile() {
  const { user } = useUser();

  const mfaEnabled = user?.twoFactorEnabled;

  return (
    <div>
      <h2>Security Settings</h2>
      <div>
        <span>Two-Factor Authentication:</span>
        <span>{mfaEnabled ? '✅ Enabled' : '❌ Disabled'}</span>
      </div>
      {!mfaEnabled && (
        <button onClick={() => {
          // Clerk provides built-in MFA setup
          window.location.href = '/user-profile#security';
        }}>
          Enable MFA
        </button>
      )}
    </div>
  );
}
```

---

## Security Best Practices

### For Administrators:

1. **Enable MFA for Admin accounts immediately** - Protect high-privilege accounts
2. **Monitor MFA adoption rates** - Track how many users enable MFA
3. **Enforce MFA for admin/mechanic roles** - Consider role-based MFA requirements
4. **Backup code storage** - Educate users to store backup codes securely (password manager)

### For Users:

1. **Use authenticator app, not SMS** - More secure against SIM swapping
2. **Save backup codes** - Store in secure location (password manager)
3. **Don't share codes** - MFA codes are single-use and time-sensitive
4. **Enable MFA on all accounts** - Not just The Pickard

---

## Troubleshooting

### Issue: QR code won't scan

**Solution:**
- Ensure authenticator app has camera permission
- Try manual entry of the secret key
- Check lighting conditions

### Issue: Code always invalid

**Solution:**
- Verify device time is synchronized (TOTP relies on accurate time)
- Check timezone settings on device
- Try regenerating MFA setup

### Issue: User lost authenticator device

**Solution:**
1. User should use backup code to log in
2. User should disable MFA and re-enable with new device
3. If no backup codes, admin can disable MFA for the user in Clerk dashboard

### Issue: SMS codes not arriving

**Solution:**
- Verify phone number is correct
- Check Twilio configuration in Clerk dashboard
- Verify SMS credits are available
- Check spam/blocked messages

---

## Cost Considerations

### Free on Clerk:

- ✅ Authenticator app (TOTP)
- ✅ Backup codes
- ✅ Up to 10,000 MAU (Monthly Active Users) on free plan

### Paid:

- ⚠️ SMS verification (requires Twilio or Clerk SMS service)
  - Twilio: ~$0.0075 per SMS in the US
  - Clerk SMS: Check current pricing
  - Only charged when users actually receive SMS codes

**Recommendation:** Start with authenticator app (TOTP) only. This is free, more secure, and provides the best user experience.

---

## Additional Resources

- [Clerk MFA Documentation](https://clerk.com/docs/authentication/configuration/sign-up-sign-in-options#multi-factor-authentication)
- [TOTP RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238) - Technical standard for time-based OTP
- [OWASP MFA Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html)

---

## Summary Checklist

Before enabling MFA in production:

- [ ] Access Clerk dashboard
- [ ] Enable authenticator app (TOTP)
- [ ] Enable backup codes
- [ ] Set MFA mode (optional or mandatory)
- [ ] Test with a test account
- [ ] Create user documentation
- [ ] Plan rollout strategy
- [ ] Communicate to users
- [ ] Monitor adoption rates
- [ ] Provide support resources

---

**Last Updated:** 2025-01-16
**Maintained By:** The Pickard Development Team

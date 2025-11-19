export class ForgotPasswordTemplate {
	static generateHtml(otpCode: string, userName?: string): string {
		return `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Reset Your Password</title>
			</head>
			<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
				<div style="background-color: #f4f4f4; padding: 20px; border-radius: 5px;">
					<h1 style="color: #333;">Password Reset Request</h1>
					<p>Hello${userName ? ` ${userName}` : ''},</p>
					<p>We received a request to reset your password. Use the following code to reset it:</p>
					<div style="text-align: center; margin: 30px 0;">
						<div style="background-color: #fff; border: 2px solid #007bff; border-radius: 5px; padding: 20px; display: inline-block;">
							<p style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px; margin: 0;">${otpCode}</p>
						</div>
					</div>
					<p>This code will expire in 1 hour.</p>
					<p>If you didn't request a password reset, please ignore this email.</p>
					<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
					<p style="font-size: 12px; color: #666;">This is an automated message, please do not reply to this email.</p>
				</div>
			</body>
			</html>
		`;
	}

	static generateText(otpCode: string, userName?: string): string {
		return `
Password Reset Request

Hello${userName ? ` ${userName}` : ''},

We received a request to reset your password. Use the following code to reset it:

${otpCode}

This code will expire in 1 hour.

If you didn't request a password reset, please ignore this email.

This is an automated message, please do not reply to this email.
		`.trim();
	}
}


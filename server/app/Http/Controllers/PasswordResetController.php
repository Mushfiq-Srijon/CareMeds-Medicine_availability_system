<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Carbon\Carbon;

class PasswordResetController extends Controller
{
    // Step 1: User submits their email
    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        // Check if email exists in users table
        $user = DB::select("SELECT * FROM users WHERE email = ?", [$request->email]);

        if (!$user) {
            return response()->json([
                'message' => 'If this email exists, a reset link has been sent.'
            ], 200);
            // NOTE: We return 200 even if email not found — this is intentional
            // so attackers cannot use this endpoint to check which emails are registered
        }

        // Delete any existing token for this email
        DB::delete("DELETE FROM password_reset_tokens WHERE email = ?", [$request->email]);

        // Generate a secure random token
        $token = Str::random(64);

        // Store token with 15 minute expiry
        DB::insert(
            "INSERT INTO password_reset_tokens (email, token, expires_at) VALUES (?, ?, ?)",
            [
                $request->email,
                $token,
                Carbon::now()->addMinutes(15)->format('Y-m-d H:i:s')
            ]
        );

        // Build the reset URL pointing to your React frontend
        $resetUrl = env('FRONTEND_URL') . '/reset-password?token=' . $token . '&email=' . urlencode($request->email);

        // Send the email
       Mail::send([], [], function ($message) use ($request, $resetUrl) {
    $message
        ->to($request->email)
        ->subject('CareMeds — Reset Your Password')
        ->setBody('
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 30px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #2a5298;">CareMeds Password Reset</h2>
                <p>You requested a password reset. Click the button below to set a new password.</p>
                <p>This link expires in <strong>15 minutes</strong>.</p>
                <a href="' . $resetUrl . '"
                   style="display:inline-block; padding: 12px 24px; background: linear-gradient(135deg, #1e3c72, #2a5298); color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">
                   Reset Password
                </a>
                <p style="margin-top: 20px; color: #999; font-size: 13px;">
                    If you did not request this, ignore this email. Your password will not change.
                </p>
            </div>
        ', 'text/html');
});

        return response()->json([
            'message' => 'If this email exists, a reset link has been sent.'
        ], 200);
    }

    // Step 2: User submits new password with token
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'token'    => 'required|string',
            'password' => 'required|string|min:6'
        ]);

        // Find the token record
        $record = DB::select(
            "SELECT * FROM password_reset_tokens WHERE email = ? AND token = ?",
            [$request->email, $request->token]
        );

        // Check token exists
        if (!$record) {
            return response()->json([
                'message' => 'Invalid or expired reset link.'
            ], 422);
        }

        // Check token has not expired
        $expiresAt = Carbon::parse($record[0]->expires_at);
        if (Carbon::now()->isAfter($expiresAt)) {
            // Delete the expired token
            DB::delete("DELETE FROM password_reset_tokens WHERE email = ?", [$request->email]);

            return response()->json([
                'message' => 'This reset link has expired. Please request a new one.'
            ], 422);
        }

        // Update the user's password
        DB::update(
            "UPDATE users SET password = ? WHERE email = ?",
            [Hash::make($request->password), $request->email]
        );

        // Delete the used token
        DB::delete("DELETE FROM password_reset_tokens WHERE email = ?", [$request->email]);

        return response()->json([
            'message' => 'Password reset successfully. You can now log in.'
        ], 200);
    }
}
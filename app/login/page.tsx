"use client";
import { login } from "../../lib/auth-actions";
import { Github, Chrome, LogIn } from "lucide-react"; // Import your icons here

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="p-8 bg-white shadow-xl rounded-lg border border-slate-200 w-full max-w-sm">
        <div className="flex justify-center mb-4 text-slate-600">
           <LogIn size={40} />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2 text-slate-800">Welcome Back</h1>
        <p className="text-slate-500 text-center mb-8">Choose a provider to sign in</p>
        
        <div className="flex flex-col gap-4">
          {/* Google Button */}
          <button 
            onClick={() => login("google")}
            className="flex items-center justify-center bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 p-3 gap-3 rounded-md transition-all font-medium cursor-pointer"
          >
            <Chrome size={20} className="text-red-500" />
            Continue with Google
          </button>

          {/* GitHub Button */}
          <button 
            onClick={() => login("github")}
            className="flex items-center justify-center bg-slate-800 hover:bg-slate-900 text-white p-3 gap-3 rounded-md transition-all font-medium cursor-pointer"
          >
            <Github size={20} />
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
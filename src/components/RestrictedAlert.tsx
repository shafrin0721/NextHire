"use client";

import { AlertTriangle, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { getCurrentUser } from "../utils/auth";

interface Props {
  message?: string;
}

export const RestrictedAlert = ({ message = "HR and Admin users only. Please login with HR/Admin account to access these features." }: Props) => {
  const user = getCurrentUser();
  const role = user?.role;
  const isHrOrAdmin = role === 'hr' || role === 'admin';

  if (isHrOrAdmin) return <></>;

  const dismiss = () => {
    const alert = document.querySelector('#restricted-alert') as HTMLElement;
    if (alert) {
      alert.style.opacity = '0';
      alert.style.transform = 'translateY(-20px)';
      setTimeout(() => alert.remove(), 300);
    }
  };

  return (
    <Card 
      id="restricted-alert"
      className="border-none bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 shadow-2xl ring-2 ring-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 mx-auto max-w-lg mt-8 mb-6 [animation:slideDownIn 0.4s ease-out]"
      style={{
        animation: 'slideDownIn 0.4s ease-out'
      }}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3.5 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-2xl shadow-xl flex-shrink-0 border-2 border-white/20">
            <Lock className="w-7 h-7 text-white drop-shadow-lg" />
          </div>
          <div>
            <CardTitle className="text-xl font-black bg-gradient-to-r from-gray-900 via-slate-800 to-gray-700 bg-clip-text text-transparent">
              Premium Features Locked
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-6">
        <p className="text-gray-700 leading-relaxed mb-4 text-base">{message}</p>
        {role && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-pink-100 rounded-full text-sm font-semibold text-red-800 border border-red-200 mb-6">
            <AlertTriangle className="w-4 h-4" />
            Current role: {role.toUpperCase()}
          </div>
        )}
        <Button 
          onClick={dismiss}
          className="w-full group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-bold text-lg py-4 px-8 rounded-2xl border-0 text-white relative overflow-hidden"
        >
          <span className="relative z-10">I Understand</span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </CardContent>
    </Card>
  );
};


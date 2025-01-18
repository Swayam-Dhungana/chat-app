import React from "react";
import { Sliders, Bell, Shield, Info } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="h-screen bg-black text-red-400 pt-20">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-zinc-900 rounded-xl p-6 shadow-lg glow-effect">
          <h1 className="text-2xl font-bold text-center mb-6">Settings</h1>
          <p className="text-center text-sm text-zinc-400 mb-8">
            Customize your preferences and system settings.
          </p>

          {/* Settings Options */}
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition">
              <div className="flex items-center gap-4">
                <Sliders className="w-6 h-6 text-green-500" />
                <span>General Settings</span>
              </div>
              <span className="text-xs text-zinc-400">Manage preferences</span>
            </div>

            <div className="flex items-center justify-between bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition">
              <div className="flex items-center gap-4">
                <Bell className="w-6 h-6 text-green-500" />
                <span>Notifications</span>
              </div>
              <span className="text-xs text-zinc-400">Adjust alert preferences</span>
            </div>

            <div className="flex items-center justify-between bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition">
              <div className="flex items-center gap-4">
                <Shield className="w-6 h-6 text-green-500" />
                <span>Privacy & Security</span>
              </div>
              <span className="text-xs text-zinc-400">Control privacy options</span>
            </div>

            <div className="flex items-center justify-between bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition">
              <div className="flex items-center gap-4">
                <Info className="w-6 h-6 text-green-500" />
                <span>About</span>
              </div>
              <span className="text-xs text-zinc-400">Learn more about the app</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

import { User, Mail, Phone, Briefcase, GraduationCap, MapPin, Edit3 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { getCurrentUser } from "../utils/auth";
import { useState } from "react";

export const CandidateProfile = () => {
  const user = getCurrentUser();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: '',
    location: '',
    experience: 0,
    education: '',
  });

  const saveProfile = () => {
    // API call to save
    console.log('Saving profile', profile);
    setEditing(false);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full items-center justify-center mb-6 shadow-2xl border-4 border-white">
            <User className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-slate-800 bg-clip-text text-transparent mb-3">
            Profile Settings
          </h1>
          <p className="text-xl text-gray-600">Manage your professional profile and preferences</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader className="flex flex-row items-center justify-between pb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Personal Information</CardTitle>
              </div>
            </div>
            <Button variant="outline" onClick={() => setEditing(!editing)} className="gap-2">
              {editing ? "Cancel" : "Edit"}
              <Edit3 className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-lg font-semibold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!editing}
                  placeholder="Phone number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                />

              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  disabled={!editing}
                  placeholder="Colombo, Sri Lanka"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
            {editing && (
              <Button onClick={saveProfile} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Professional Summary</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                Years of Experience
              </label>
              <input
                type="number"
                value={profile.experience}
                onChange={(e) => setProfile({ ...profile, experience: parseInt(e.target.value) || 0 })}
                disabled={!editing}
                className="w-24 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-lg font-bold"
                min="0"
              />
              <span className="text-sm text-gray-500">years</span>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-3">
                Education & Certifications
              </label>
              <textarea
                value={profile.education}
                onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                disabled={!editing}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed resize-vertical"
                placeholder="BSc Computer Science, University of Colombo (2020)&#10;AWS Certified Developer (2023)&#10;React Certification (2024)"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


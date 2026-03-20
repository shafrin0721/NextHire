import React, { useState } from "react";
import { FileText, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  status: string;
  appliedDate: string;
  nextAction: string;
  statusColor: string;
}

const mockApplications: Application[] = [
  { 
    id: "APP-001", 
    jobTitle: "Senior Frontend Developer", 
    company: "TechCorp", 
    status: "Interview Scheduled", 
    appliedDate: "2024-04-15", 
    nextAction: "Technical Interview - Apr 20",
    statusColor: "bg-emerald-100 text-emerald-800"
  },
  { 
    id: "APP-002", 
    jobTitle: "Full Stack Developer", 
    company: "Innovate Ltd", 
    status: "Shortlisted", 
    appliedDate: "2024-04-12", 
    nextAction: "Waiting for interview schedule",
    statusColor: "bg-blue-100 text-blue-800"
  },
  { 
    id: "APP-003", 
    jobTitle: "React Developer", 
    company: "NextHire", 
    status: "Pending", 
    appliedDate: "2024-04-10", 
    nextAction: "Under review",
    statusColor: "bg-gray-100 text-gray-800"
  },
  { 
    id: "APP-004", 
    jobTitle: "UI/UX Designer", 
    company: "DesignPro", 
    status: "Rejected", 
    appliedDate: "2024-04-08", 
    nextAction: "Feedback available",
    statusColor: "bg-red-100 text-red-800"
  },
];

export const CandidateApplications = () => {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionModal, setActionModal] = useState(false);

  const showApplicationModal = (app: Application) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  const showActionModal = (app: Application) => {
    setSelectedApp(app);
    setActionModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActionModal(false);
    setSelectedApp(null);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
            My Applications
          </h1>
          <p className="text-xl text-gray-600">
            Track status, view feedback, and take next steps for all your applications.
          </p>
        </div>

        {/* Applications Table */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-7 h-7" />
                Application History
              </CardTitle>
              <Button asChild className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600">
                <Link to="/jobs">+ New Application</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Job</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Applied</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Next Action</th>
                    <th className="w-32"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockApplications.map((app: Application, index: number) => (
                    <tr key={app.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="px-6 py-5">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{app.jobTitle}</div>
                          <div className="text-sm text-gray-500">ID: {app.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-medium text-gray-900">{app.company}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${app.statusColor}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-500">{app.appliedDate}</td>
                      <td className="px-6 py-5">
                        <div className="text-sm text-gray-900">{app.nextAction}</div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Button variant="outline" size="sm" className="mr-2" onClick={() => showApplicationModal(app)}>
                          Details
                        </Button>
                        <Button size="sm" onClick={() => showActionModal(app)} className={`bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 ${app.status === 'Rejected' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          {app.status === 'Rejected' ? 'Feedback' : 'Next Step'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Details Modal */}
        {showModal && selectedApp && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Application Details - {selectedApp.jobTitle}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={closeModal} className="text-white hover:bg-white/20">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Company</h3>
                    <p className="text-gray-600">{selectedApp.company}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${selectedApp.statusColor}`}>
                      {selectedApp.status}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Applied Date</h3>
                    <p className="text-gray-600">{selectedApp.appliedDate}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Next Action</h3>
                    <p className="text-gray-600">{selectedApp.nextAction}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Application ID</h3>
                  <p className="text-gray-600 font-mono bg-gray-100 px-3 py-1 rounded-md inline-block">
                    {selectedApp.id}
                  </p>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-gray-900 mb-3">Recent Activity</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Apr 15: Application submitted</p>
                    <p>• Apr 16: Resume screening completed</p>
                    <p>• Apr 18: Technical assessment sent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Modal */}
        {actionModal && selectedApp && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md bg-white shadow-2xl">
              <CardHeader className={`bg-gradient-to-r ${selectedApp.status === 'Rejected' ? 'from-red-500 to-red-600' : 'from-emerald-500 to-green-600'} text-white`}>
                <CardTitle className="text-white">{selectedApp.status === 'Rejected' ? 'Feedback' : 'Next Step'}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {selectedApp.status === 'Rejected' ? (
                  <div className="space-y-4">
                    <p className="text-gray-600">Thank you for applying to <strong>{selectedApp.jobTitle}</strong> at <strong>{selectedApp.company}</strong>.</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Strong portfolio but lacked specific React experience</li>
                      <li>Good communication skills</li>
                      <li>Consider applying for Junior roles</li>
                    </ul>
                    <Button className="w-full" onClick={closeModal}>
                      Close
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-600">Prepare for your <strong>{selectedApp.nextAction}</strong> for <strong>{selectedApp.jobTitle}</strong>.</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Review Questions
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Practice Test
                      </Button>
                    </div>
                    <Button className="w-full" onClick={closeModal}>
                      I'm Ready
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};


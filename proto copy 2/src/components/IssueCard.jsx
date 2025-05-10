import { MapPin, User, CheckCircle, Send } from "lucide-react";

const IssueCard = ({ issue, onResolve, onSend }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold text-green-700">
          {issue.type}
        </span>
        <span
          className={`text-sm font-medium px-2 py-1 rounded ${
            issue.resolved
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {issue.resolved ? "Resolved" : "Pending"}
        </span>
      </div>

      <p className="text-gray-700 mb-2">{issue.description}</p>

      <div className="text-sm text-gray-600 mb-4 flex flex-col gap-1">
        <span className="flex items-center gap-2">
          <MapPin size={16} /> {issue.location}
        </span>
        <span className="flex items-center gap-2">
          <User size={16} /> Reported by: {issue.username}
        </span>
      </div>

      <div className="flex gap-3">
        {!issue.resolved && (
          <button
            onClick={() => onResolve(issue.id)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            <CheckCircle size={16} />
            Mark as Resolved
          </button>
        )}
        <button
          onClick={() => onSend(issue)}
          className="flex items-center gap-2 border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50 transition"
        >
          <Send size={16} />
          Send to Government
        </button>
      </div>
    </div>
  );
};

export default IssueCard;

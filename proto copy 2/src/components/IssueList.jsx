import IssueCard from "./IssueCard";

const IssueList = ({ issues, onResolve, onSend }) => {
  if (issues.length === 0) {
    return <p className="text-gray-600">No issues reported yet.</p>;
  }

  

  return (
    <div className="grid gap-6">
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          issue={issue}
          onResolve={onResolve}
          onSend={onSend}
        />
      ))}
    </div>
  );
};

export default IssueList;

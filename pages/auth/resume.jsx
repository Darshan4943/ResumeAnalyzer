import React, { useEffect, useState } from "react";
import axios from "axios";
import MiniLoader from "../../components/common/miniLoader";

function ResumePage({ onClose }) {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const parsedResume = localStorage.getItem("parsedResume");

    if (parsedResume) {
      axios
        .post("http://localhost:2000/api/resumeCheck", {
          resumeText: parsedResume,
        })
        .then((response) => {
          setResumeData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("No resume data found in localStorage");
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 customMargins py-6 justify-between">
      {loading && <MiniLoader />}

      {resumeData && (
        <div>
             {resumeData.atsScore !== undefined && (
              <p className="text-xl font-semibold mt-2">
                ATS Score: <span className="text-green-600">{resumeData.atsScore}%</span>
              </p>
            )}
          <h2>Strengths</h2>
          {resumeData.strengths && resumeData.strengths.length > 0 ? (
            <ul>
              {resumeData.strengths.map((strength, index) => (
                <li key={index}>
                  <strong>{strength.point}:</strong> {strength.explanation}
                </li>
              ))}
            </ul>
          ) : (
            <p>No strengths listed.</p>
          )}

          <h2>Areas of Concern</h2>
          {resumeData.areasOfConcern && resumeData.areasOfConcern.length > 0 ? (
            <ul>
              {resumeData.areasOfConcern.map((concern, index) => (
                <li key={index}>
                  <strong>{concern.point}:</strong> {concern.explanation}
                </li>
              ))}
            </ul>
          ) : (
            <p>No areas of concern.</p>
          )}

          <h2>Improvement Suggestions</h2>
          {resumeData.improvementSuggestions &&
          resumeData.improvementSuggestions.length > 0 ? (
            <ul>
              {resumeData.improvementSuggestions.map((suggestion, index) => (
                <li key={index}>
                  <strong>{suggestion.point}:</strong> {suggestion.explanation}
                </li>
              ))}
            </ul>
          ) : (
            <p>No improvement suggestions.</p>
          )}

          <h2>Missing or Weak Sections</h2>
          {resumeData.missingOrWeakSections &&
          resumeData.missingOrWeakSections.length > 0 ? (
            <ul>
              {resumeData.missingOrWeakSections.map((section, index) => (
                <li key={index}>
                  <strong>{section.point}:</strong> {section.explanation}
                </li>
              ))}
            </ul>
          ) : (
            <p>No missing or weak sections.</p>
          )}

          <h2>Formatting Recommendations</h2>
          {resumeData.formattingRecommendations &&
          resumeData.formattingRecommendations.length > 0 ? (
            <ul>
              {resumeData.formattingRecommendations.map(
                (recommendation, index) => (
                  <li key={index}>
                    <strong>{recommendation.point}:</strong>{" "}
                    {recommendation.explanation}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>No formatting recommendations.</p>
          )}

          <h2>Recommended Keywords</h2>
          {resumeData.recommendedKeywords &&
          resumeData.recommendedKeywords.length > 0 ? (
            <ul>
              {resumeData.recommendedKeywords.map((keyword, index) => (
                <li key={index}>
                  <strong>{keyword.keyword}:</strong> {keyword.explanation}
                </li>
              ))}
            </ul>
          ) : (
            <p>No recommended keywords.</p>
          )}

          <h2>Tone and Language Feedback</h2>
          {resumeData.toneAndLanguageFeedback &&
          resumeData.toneAndLanguageFeedback.length > 0 ? (
            <ul>
              {resumeData.toneAndLanguageFeedback.map((feedback, index) => (
                <li key={index}>
                  <strong>{feedback.point}:</strong> {feedback.explanation}
                </li>
              ))}
            </ul>
          ) : (
            <p>No tone and language feedback.</p>
          )}

          <h2>Grammar and Spelling Corrections</h2>
          {resumeData.grammarAndSpellingCorrections &&
          resumeData.grammarAndSpellingCorrections.length > 0 ? (
            <ul>
              {resumeData.grammarAndSpellingCorrections.map(
                (correction, index) => (
                  <li key={index}>
                    <strong>{correction.issue}:</strong> {correction.suggestion}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>No grammar or spelling corrections.</p>
          )}

          <h2>Redundancy and Filler Content</h2>
          {resumeData.redundancyAndFillerContent &&
          resumeData.redundancyAndFillerContent.length > 0 ? (
            <ul>
              {resumeData.redundancyAndFillerContent.map((item, index) => (
                <li key={index}>
                  <strong>{item.point}:</strong> {item.explanation}
                </li>
              ))}
            </ul>
          ) : (
            <p>No redundancy or filler content detected.</p>
          )}

          <h2>Ideal Role Fit</h2>
          {resumeData.idealRoleFit && resumeData.idealRoleFit.length > 0 ? (
            <ul>
              {resumeData.idealRoleFit.map((role, index) => (
                <li key={index}>
                  <strong>{role.title}:</strong> {role.reason}
                </li>
              ))}
            </ul>
          ) : (
            <p>No ideal role fit identified.</p>
          )}

          <button onClick={onClose}>Close</button>
        </div>
      )}
    </div>
  );
}

export default ResumePage;

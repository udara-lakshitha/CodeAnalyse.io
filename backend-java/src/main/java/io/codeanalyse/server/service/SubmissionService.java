package io.codeanalyse.server.service;

import io.codeanalyse.server.dto.AnalysisRequest;
import io.codeanalyse.server.dto.AnalysisResponse;
import io.codeanalyse.server.model.Submission;
import io.codeanalyse.server.model.User;
import io.codeanalyse.server.repository.SubmissionRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

@Service
public class SubmissionService {

    private final RestTemplate restTemplate;
    private final SubmissionRepository submissionRepository;
    private final String pythonServiceUrl;

    public SubmissionService(SubmissionRepository submissionRepository, @Value("${python.analysis.service.url}") String pythonServiceUrl) {
        this.restTemplate = new RestTemplate();
        this.submissionRepository = submissionRepository;
        this.pythonServiceUrl = pythonServiceUrl;
    }

    public AnalysisResponse analyse(AnalysisRequest request, User user) {
        // 1. Call the Python service.
        // We use restTemplate.postForObject, which sends a POST request.
        // - The first argument is the URL.
        // - The second argument is the request body (our AnalysisRequest DTO).
        // - The third argument is the class of the expected response. Spring will auto-convert the JSON.

        AnalysisResponse pythonResponse = restTemplate.postForObject(pythonServiceUrl, request, AnalysisResponse.class);

        // 2. Save the submission
        Submission submission = new Submission();
        submission.setUser(user);
        submission.setCodeContent(request.getCode());
        assert pythonResponse != null;
        submission.setAnalysis_result(pythonResponse.getAnalysisResults().toString());
        submissionRepository.save(submission);

        return pythonResponse;
    }

}

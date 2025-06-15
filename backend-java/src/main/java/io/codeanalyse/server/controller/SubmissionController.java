package io.codeanalyse.server.controller;

import io.codeanalyse.server.dto.AnalysisRequest;
import io.codeanalyse.server.dto.AnalysisResponse;
import io.codeanalyse.server.model.User;
import io.codeanalyse.server.service.SubmissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping("/analyse")
    public ResponseEntity<AnalysisResponse> analyse(
            @RequestBody AnalysisRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(submissionService.analyse(request, user));
    }
}

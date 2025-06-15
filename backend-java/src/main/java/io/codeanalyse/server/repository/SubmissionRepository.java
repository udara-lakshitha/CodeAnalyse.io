package io.codeanalyse.server.repository;

import io.codeanalyse.server.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
}

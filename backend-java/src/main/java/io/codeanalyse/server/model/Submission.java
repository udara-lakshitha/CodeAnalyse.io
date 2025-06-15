package io.codeanalyse.server.model;

import jakarta.persistence.*;

@Entity
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob // means large object
    @Column(name = "code_content", columnDefinition = "TEXT")
    private String codeContent;

    @Lob
    @Column(name = "analysis_result", columnDefinition = "TEXT")
    private String analysis_result;

    // Establish Many-to-One relationship. May submissions can belong to one user.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeContent() {
        return codeContent;
    }

    public void setCodeContent(String codeContent) {
        this.codeContent = codeContent;
    }

    public String getAnalysis_result() {
        return analysis_result;
    }

    public void setAnalysis_result(String analysis_result) {
        this.analysis_result = analysis_result;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

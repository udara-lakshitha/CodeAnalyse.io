export interface SignUpRequest {
    name: string,
    email: string,
    password: string
}

export interface SignInRequest {
    email: string,
    password: string
}

export interface JwtAuthenticationResponse {
    token: string
}

export interface AnalysisRequest {
  code: string;
}

export interface AnalysisResult {
  methodName: string;
  defectProbability: string;
}

export interface AnalysisResponse {
  analysisResults: AnalysisResult[];
}
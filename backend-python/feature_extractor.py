# feature_extractor.py
import lizard
import tempfile
import os

# This is the exact list of 21 features our model was trained on, in the correct order
# This is CRITICAL and the column must match with kc1.csv columns
EXPECTED_FEATURES = [
    'loc', 'v(g)', 'ev(g)', 'iv(g)', 'n', 'v', 'l', 'd', 'i', 'e', 'b',
    't', 'lOCode', 'lOComment', 'lOBlank', 'locCodeAndComment', 'uniq_Op',
    'uniq_Opnd', 'total_Op', 'total_Opnd', 'branchCount'
]

def analyze_java_code(code_string):
    """
    Analyzes a string of Java code to extract the 21 features our model expects.
    
    Args:
        code_string: A string containing the Java code for a single file.

    Returns:
        A list of dictionaries, where each dictionary contains the features for one method.
        Returns an empty list if no methods are found or an error occurs.
    """

    # The lizard library works with files, not strings.
    # So, we need to create a temporary file to store the code string.
    # 'tempfile.NamedTemporaryFile' is a secure way to do this.
    # 'delete=False' is important so we can close it and let lizard read it.
    # 'suffix=".java"' tells lizard this is a Java file.

    temp_file = None
    try:
        with tempfile.NamedTemporaryFile(mode = "w+", delete = False, suffix = ".java") as temp_file:
            temp_file.write(code_string)
            temp_file_path = temp_file.name

        # 1. RUN LIZARD ANALYSIS
        analysis = lizard.analyze_file(temp_file_path)
        methods_data = []
        for method in analysis.function_list:
            # 2. EXTRACT THE METRICS FOR EACH METHOD
            nloc = getattr(method, 'nloc', 0)
            token_count = getattr(method, 'token_count', 0)
            
            feature_dict = {
                'loc': nloc,
                'v(g)': getattr(method, 'cyclomatic_complexity', 0),
                'ev(g)': getattr(method, 'essential_complexity', 0),
                'iv(g)': getattr(method, 'design_complexity', 0),
                'n': getattr(method, 'length', 0),
                'v': getattr(method, 'volume', 0),      # <-- The source of the crash
                'l': 0,
                'd': getattr(method, 'difficulty', 0),
                'i': getattr(method, 'effort', 0),
                'e': 0,
                'b': getattr(method, 'volume', 0),      # <-- Also needs getattr
                't': getattr(method, 'time', 0),
                'lOCode': token_count,
                'lOComment': getattr(method, 'comment_lines', 0),
                'lOBlank': nloc - token_count,
                'locCodeAndComment': 0,
                'uniq_Op': token_count,
                'uniq_Opnd': len(getattr(method, 'parameters', [])),
                'total_Op': token_count,
                'total_Opnd': len(getattr(method, 'parameters', [])),
                'branchCount': getattr(method, 'condition_count', 0)
            }
            
            ordered_features = [feature_dict.get(name, 0) for name in EXPECTED_FEATURES]
            
            methods_data.append({
                "methodName": getattr(method, 'long_name', 'Unnamed Method'),
                "features": ordered_features
            })
        return methods_data
    finally:
        # 3. CLEAN UP THE TEMPORARY FILE
        if temp_file and os.path.exists(temp_file.name):
            os.unlink(temp_file.name)
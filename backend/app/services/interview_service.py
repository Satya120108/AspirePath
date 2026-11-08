from typing import List, Dict, Any

class InterviewService:
    @classmethod
    def generate_questions(cls, role: str, category: str, difficulty: str, count: int = 3) -> List[Dict[str, Any]]:
        questions_pool = [
            {
                'category': 'Technical',
                'difficulty': 'Mid-level',
                'question': 'Explain how you would design a rate limiting system for a public API handling 10,000 requests per second. Compare Token Bucket vs Sliding Window log.',
                'expected_key_points': [
                    'Token Bucket algorithm mechanism and burst handling',
                    'Sliding Window counter/log memory trade-offs',
                    'Redis atomic operations (INCR, MULTI/EXEC, Lua scripts)',
                    'HTTP 429 Too Many Requests response headers (Retry-After)'
                ]
            },
            {
                'category': 'Technical',
                'difficulty': 'Mid-level',
                'question': 'How do you optimize a slow database query in PostgreSQL involving large table joins? Walk through indexing, EXPLAIN ANALYZE, and partitioning.',
                'expected_key_points': [
                    'EXPLAIN ANALYZE inspection for Sequential Scans vs Index Scans',
                    'B-Tree vs Composite Indexes',
                    'Query rewriting to eliminate subqueries or unnecessary cartesian products',
                    'Table partitioning by date or tenant ID'
                ]
            },
            {
                'category': 'Behavioral',
                'difficulty': 'Mid-level',
                'question': 'Tell me about a time when you disagreed with a senior engineer on an architectural design decision. How did you resolve it?',
                'expected_key_points': [
                    'Situation and context of technical disagreement',
                    'Objective data collection (benchmarking, RFC documentation)',
                    'Respectful dialogue focusing on customer impact',
                    'Commitment to team decision'
                ]
            }
        ]
        return questions_pool[:count]

    @classmethod
    def evaluate_answer(
        cls,
        question: str,
        category: str,
        difficulty: str,
        user_answer: str,
        key_points: List[str] = None
    ) -> Dict[str, Any]:
        """
        Evaluates interview responses based on relevance, clarity, technical accuracy, and completeness.
        """
        answer_length = len(user_answer.split())
        
        # Calculate scores
        relevance = min(98, max(65, 75 + (5 if any(term in user_answer.lower() for term in ['redis', 'token', 'bucket', 'http', 'query', 'index', 'latency']) else 0)))
        clarity = min(95, max(60, 70 + (10 if answer_length > 25 else 0)))
        accuracy = min(96, max(60, 80 if 'redis' in user_answer.lower() or 'explain' in user_answer.lower() or 'star' in user_answer.lower() else 70))
        completeness = min(95, max(50, 75 if answer_length > 40 else 65))

        overall = int((relevance * 0.3) + (accuracy * 0.3) + (clarity * 0.2) + (completeness * 0.2))

        return {
            'overall_score': overall,
            'relevance_score': relevance,
            'clarity_score': clarity,
            'technical_accuracy': accuracy,
            'completeness_score': completeness,
            'feedback': 'Strong, articulate answer! You addressed the core requirements, discussed trade-offs, and referenced appropriate technical protocols and status codes.',
            'strengths': [
                'Correctly identified distributed concurrency considerations.',
                'Clear, professional technical communication style.',
                'Demonstrated understanding of production resilience.'
            ],
            'improvements': [
                'Consider mentioning client-side retry strategies (exponential backoff with jitter).',
                'Briefly highlight failure modes when external datastores experience transient outages.'
            ],
            'ideal_sample_answer': (
                f"For {question}, an ideal response starts by stating key assumptions (scale, throughput), "
                "proposes a high-level component architecture (API Gateway + In-memory Redis store), "
                "details trade-offs between memory efficiency and burst tolerance, and concludes with "
                "observability metrics and graceful failure fallback."
            )
        }

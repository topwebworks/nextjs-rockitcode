-- Week 6: AI Integration Database Schema
-- Enhanced tables for AI-powered learning features

-- Create AI interactions tracking table
CREATE TABLE IF NOT EXISTS ai_interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    interaction_type TEXT NOT NULL CHECK (interaction_type IN (
        'code_review', 
        'concept_explanation', 
        'hint_generation', 
        'learning_path_recommendation',
        'practice_problem_generation',
        'difficulty_assessment'
    )),
    input_data JSONB NOT NULL DEFAULT '{}',
    output_data JSONB NOT NULL DEFAULT '{}',
    lesson_id TEXT,
    course_id TEXT,
    response_time_ms INTEGER,
    tokens_used INTEGER,
    model_used TEXT,
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create learning analytics table for AI insights
CREATE TABLE IF NOT EXISTS learning_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    metric_type TEXT NOT NULL CHECK (metric_type IN (
        'engagement_score',
        'comprehension_level',
        'learning_velocity',
        'difficulty_preference',
        'concept_mastery',
        'hint_dependency',
        'code_quality_trend'
    )),
    metric_value DECIMAL NOT NULL,
    context_data JSONB DEFAULT '{}',
    calculated_at TIMESTAMPTZ DEFAULT NOW(),
    valid_until TIMESTAMPTZ DEFAULT NOW() + INTERVAL '7 days'
);

-- Create personalized content recommendations table
CREATE TABLE IF NOT EXISTS content_recommendations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    recommendation_type TEXT NOT NULL CHECK (recommendation_type IN (
        'next_lesson',
        'practice_problem',
        'concept_review',
        'project_idea',
        'skill_improvement'
    )),
    content_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 10),
    estimated_time_minutes INTEGER,
    reasoning TEXT,
    confidence_score DECIMAL CHECK (confidence_score >= 0 AND confidence_score <= 1),
    priority_score INTEGER DEFAULT 5 CHECK (priority_score >= 1 AND priority_score <= 10),
    metadata JSONB DEFAULT '{}',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'viewed', 'started', 'completed', 'dismissed')),
    expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '7 days',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create collaborative learning sessions table
CREATE TABLE IF NOT EXISTS collaboration_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_type TEXT NOT NULL CHECK (session_type IN (
        'pair_programming',
        'code_review',
        'study_group',
        'mentorship',
        'help_request'
    )),
    host_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    max_participants INTEGER DEFAULT 2,
    current_participants INTEGER DEFAULT 1,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'active', 'completed', 'cancelled')),
    language TEXT,
    difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 10),
    topic_tags TEXT[] DEFAULT '{}',
    session_data JSONB DEFAULT '{}',
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create collaboration participants table
CREATE TABLE IF NOT EXISTS collaboration_participants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id UUID REFERENCES collaboration_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'participant' CHECK (role IN ('host', 'participant', 'observer')),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    left_at TIMESTAMPTZ,
    contribution_score INTEGER DEFAULT 0,
    feedback_given TEXT,
    feedback_received TEXT,
    UNIQUE(session_id, user_id)
);

-- Create real-time code sharing table
CREATE TABLE IF NOT EXISTS shared_code_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    collaboration_session_id UUID REFERENCES collaboration_sessions(id) ON DELETE CASCADE,
    language TEXT NOT NULL,
    code_content TEXT DEFAULT '',
    cursor_positions JSONB DEFAULT '{}',
    version INTEGER DEFAULT 1,
    last_edited_by UUID REFERENCES auth.users(id),
    last_edited_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create AI-generated practice problems table
CREATE TABLE IF NOT EXISTS ai_practice_problems (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    generated_for_user_id UUID REFERENCES auth.users(id),
    topic TEXT NOT NULL,
    difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 10),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    hints TEXT[] DEFAULT '{}',
    solution_approach TEXT,
    test_cases JSONB DEFAULT '[]',
    language TEXT NOT NULL,
    estimated_time_minutes INTEGER,
    tags TEXT[] DEFAULT '{}',
    usage_count INTEGER DEFAULT 0,
    avg_completion_rate DECIMAL DEFAULT 0,
    avg_time_spent INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user problem attempts table
CREATE TABLE IF NOT EXISTS user_problem_attempts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    problem_id UUID REFERENCES ai_practice_problems(id) ON DELETE CASCADE,
    attempt_number INTEGER DEFAULT 1,
    submitted_code TEXT,
    result TEXT CHECK (result IN ('correct', 'incorrect', 'partial', 'error')),
    test_cases_passed INTEGER DEFAULT 0,
    total_test_cases INTEGER DEFAULT 0,
    hints_used INTEGER DEFAULT 0,
    time_spent_minutes INTEGER DEFAULT 0,
    ai_feedback TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, problem_id, attempt_number)
);

-- Create indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_ai_interactions_user_id ON ai_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_interactions_type ON ai_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_ai_interactions_created_at ON ai_interactions(created_at);

CREATE INDEX IF NOT EXISTS idx_learning_analytics_user_id ON learning_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_analytics_metric_type ON learning_analytics(metric_type);
CREATE INDEX IF NOT EXISTS idx_learning_analytics_calculated_at ON learning_analytics(calculated_at);

CREATE INDEX IF NOT EXISTS idx_content_recommendations_user_id ON content_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_content_recommendations_status ON content_recommendations(status);
CREATE INDEX IF NOT EXISTS idx_content_recommendations_expires_at ON content_recommendations(expires_at);

CREATE INDEX IF NOT EXISTS idx_collaboration_sessions_status ON collaboration_sessions(status);
CREATE INDEX IF NOT EXISTS idx_collaboration_sessions_host ON collaboration_sessions(host_user_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_sessions_created_at ON collaboration_sessions(created_at);

CREATE INDEX IF NOT EXISTS idx_collaboration_participants_session ON collaboration_participants(session_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_participants_user ON collaboration_participants(user_id);

CREATE INDEX IF NOT EXISTS idx_ai_practice_problems_topic ON ai_practice_problems(topic);
CREATE INDEX IF NOT EXISTS idx_ai_practice_problems_difficulty ON ai_practice_problems(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_ai_practice_problems_language ON ai_practice_problems(language);

CREATE INDEX IF NOT EXISTS idx_user_problem_attempts_user_id ON user_problem_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_problem_attempts_problem_id ON user_problem_attempts(problem_id);
CREATE INDEX IF NOT EXISTS idx_user_problem_attempts_result ON user_problem_attempts(result);

-- Row Level Security (RLS) Policies
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_code_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_practice_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_problem_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for AI interactions
CREATE POLICY "Users can view own AI interactions" ON ai_interactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI interactions" ON ai_interactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for learning analytics
CREATE POLICY "Users can view own analytics" ON learning_analytics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert analytics" ON learning_analytics
    FOR INSERT WITH CHECK (true);

-- RLS Policies for content recommendations
CREATE POLICY "Users can manage own recommendations" ON content_recommendations
    FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for collaboration sessions
CREATE POLICY "Users can view public sessions" ON collaboration_sessions
    FOR SELECT USING (status = 'open' OR host_user_id = auth.uid());

CREATE POLICY "Users can create sessions" ON collaboration_sessions
    FOR INSERT WITH CHECK (auth.uid() = host_user_id);

CREATE POLICY "Users can update own sessions" ON collaboration_sessions
    FOR UPDATE USING (auth.uid() = host_user_id);

-- RLS Policies for collaboration participants
CREATE POLICY "Users can view session participants" ON collaboration_participants
    FOR SELECT USING (
        auth.uid() = user_id OR 
        EXISTS (SELECT 1 FROM collaboration_participants WHERE session_id = collaboration_participants.session_id AND user_id = auth.uid())
    );

CREATE POLICY "Users can manage own participation" ON collaboration_participants
    FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for shared code sessions
CREATE POLICY "Participants can access shared code" ON shared_code_sessions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM collaboration_participants 
            WHERE session_id = collaboration_session_id AND user_id = auth.uid()
        )
    );

-- RLS Policies for AI practice problems
CREATE POLICY "Users can view practice problems" ON ai_practice_problems
    FOR SELECT USING (true);

CREATE POLICY "System can create practice problems" ON ai_practice_problems
    FOR INSERT WITH CHECK (true);

-- RLS Policies for user problem attempts
CREATE POLICY "Users can manage own attempts" ON user_problem_attempts
    FOR ALL USING (auth.uid() = user_id);

-- Functions for AI analytics and insights
CREATE OR REPLACE FUNCTION calculate_user_engagement_score(p_user_id UUID)
RETURNS DECIMAL AS $$
DECLARE
    engagement_score DECIMAL;
BEGIN
    -- Calculate engagement based on recent activity
    SELECT 
        COALESCE(
            (COUNT(CASE WHEN created_at > NOW() - INTERVAL '7 days' THEN 1 END) * 0.4) +
            (COUNT(CASE WHEN created_at > NOW() - INTERVAL '30 days' THEN 1 END) * 0.3) +
            (AVG(CASE WHEN interaction_type = 'code_review' THEN 5 ELSE 3 END) * 0.3),
            0
        )
    INTO engagement_score
    FROM ai_interactions
    WHERE user_id = p_user_id;
    
    RETURN LEAST(engagement_score, 100);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate personalized content recommendations
CREATE OR REPLACE FUNCTION generate_content_recommendations(p_user_id UUID)
RETURNS TABLE(
    recommendation_type TEXT,
    content_id TEXT,
    title TEXT,
    description TEXT,
    confidence_score DECIMAL
) AS $$
BEGIN
    -- This would implement ML-based recommendation logic
    -- For now, return sample recommendations
    RETURN QUERY
    SELECT 
        'next_lesson'::TEXT,
        'javascript-functions-advanced'::TEXT,
        'Advanced JavaScript Functions'::TEXT,
        'Ready to learn about closures and higher-order functions'::TEXT,
        0.85::DECIMAL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment hint usage tracking
CREATE OR REPLACE FUNCTION increment_hint_usage(p_user_id UUID, p_lesson_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    -- Update course progress with hint usage
    UPDATE course_progress 
    SET 
        exercise_data = COALESCE(exercise_data, '{}') || jsonb_build_object(
            'hints_used', 
            COALESCE((exercise_data->>'hints_used')::INTEGER, 0) + 1
        ),
        updated_at = NOW()
    WHERE user_id = p_user_id AND lesson_id = p_lesson_id;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update learning analytics
CREATE OR REPLACE FUNCTION update_learning_analytics(
    p_user_id UUID,
    p_metric_type TEXT,
    p_metric_value DECIMAL,
    p_context_data JSONB DEFAULT '{}'
)
RETURNS BOOLEAN AS $$
BEGIN
    INSERT INTO learning_analytics (
        user_id, metric_type, metric_value, context_data
    ) VALUES (
        p_user_id, p_metric_type, p_metric_value, p_context_data
    );
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

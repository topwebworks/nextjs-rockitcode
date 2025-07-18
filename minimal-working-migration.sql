-- MINIMAL WORKING MIGRATION - This will definitely fix the OAuth issue
-- Only creates what's absolutely necessary for GitHub OAuth to work

-- Create the user_profiles table (the one causing the error)
CREATE TABLE user_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the user_preferences table (also needed by trigger)
CREATE TABLE user_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key constraints to auth.users
ALTER TABLE user_profiles 
    ADD CONSTRAINT user_profiles_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE user_preferences 
    ADD CONSTRAINT user_preferences_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies (allow authenticated users to access their own data)
CREATE POLICY "Users can access own profile" ON user_profiles
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can access own preferences" ON user_preferences
    FOR ALL USING (auth.uid() = user_id);

-- Create the function that handles new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert basic profile
    INSERT INTO user_profiles (user_id, full_name, avatar_url)
    VALUES (
        NEW.id, 
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    
    -- Insert basic preferences
    INSERT INTO user_preferences (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Create the trigger that automatically creates profiles for new users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Grant permissions
GRANT ALL ON user_profiles TO authenticated;
GRANT ALL ON user_preferences TO authenticated;

-- Verification
SELECT 'Migration completed! Tables created:' as status;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
SELECT 'Trigger created:' as status;
SELECT trigger_name FROM information_schema.triggers WHERE event_object_table = 'users' AND event_object_schema = 'auth';

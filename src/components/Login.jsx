import { supabase } from '../utils/supabaseClient';

// google loin - leaves and comes back to the app after successful login
const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) {
    console.error('Error logging in with Google:', error);
  }
};

const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Logout error:", error);
};


export { handleGoogleLogin, handleLogout };
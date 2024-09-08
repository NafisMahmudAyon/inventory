'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/components/createClient';

const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      // Get the session from localStorage
      const session = JSON.parse(localStorage.getItem('user') || '{}');

      if (session && session.email) {
        try {
          const { data: user, error } = await supabase
            .from('user')
            .select('user_name')
            .eq('email', session.email)
            .single();

          if (error) {
            console.error('Error fetching user:', error);
            return;
          }

          if (user) {
            setUserName(user.user_name);
            setUserInfo(user); // Optionally store user info
          }
        } catch (err) {
          console.error('Error:', err);
        }
      }
    };

    fetchUserName();
  }, []);

  console.log('Username:', userName); // Should log the username if available
  console.log('User info:', userInfo); // Should log the entire user info object
  console.log('Session:', JSON.parse(localStorage.getItem('user') || '{}'));  // Log session info for debugging

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Welcome, {userName || 'User'}!</h2>
      <p className="text-gray-600">This is your dashboard. You are now logged in!</p>
    </div>
  );
};

export default Dashboard;

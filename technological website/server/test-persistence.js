// Test script to verify user persistence
const testUserPersistence = async () => {
  try {
    // Test registration
    const registerResponse = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser_' + Date.now(),
        password: 'testpass123'
      })
    });

    if (registerResponse.ok) {
      const data = await registerResponse.json();
      console.log('✅ Registration successful:', data.user.username);
      
      // Test login
      const loginResponse = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.user.username,
          password: 'testpass123'
        })
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        console.log('✅ Login successful, token received');
        
        // Test token validation
        const meResponse = await fetch('http://localhost:3001/api/me', {
          headers: { 'Authorization': `Bearer ${loginData.token}` }
        });

        if (meResponse.ok) {
          const meData = await meResponse.json();
          console.log('✅ Token validation successful:', meData.user.username);
        } else {
          console.log('❌ Token validation failed');
        }
      } else {
        console.log('❌ Login failed');
      }
    } else {
      console.log('❌ Registration failed');
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

console.log('🧪 Testing user persistence...');
testUserPersistence();
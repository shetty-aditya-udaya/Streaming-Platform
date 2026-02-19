// using native fetch

// Check if fetch is improved, otherwise use built-in global fetch if node version > 18
const apiTest = async () => {
    const baseUrl = 'http://localhost:5000/api/auth';
    const testUser = {
        name: 'Test Setup User',
        email: `test_${Date.now()}@example.com`,
        password: 'securepassword123'
    };

    console.log('Testing Signup...');
    try {
        const signupRes = await fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const signupData = await signupRes.json();
        console.log('Signup Status:', signupRes.status);
        console.log('Signup Response:', signupData);

        if (signupRes.status === 201) {
            console.log('Testing Login...');
            const loginRes = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: testUser.email, password: testUser.password })
            });
            const loginData = await loginRes.json();
            console.log('Login Status:', loginRes.status);
            console.log('Login Response:', loginData);
        }
    } catch (error) {
        console.error('Test failed:', error);
    }
};

apiTest();

const supabase = window.supabase.createClient(
  'https://jojkaykqkeaeqkswevjo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvamtheWtxa2VhZXFrc3dldmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5OTQwODIsImV4cCI6MjA2MzU3MDA4Mn0.gKpu8PxMmRfV_RZpkW1kaBegSmLglJzTvHdRCtjt_So'
);

document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  

  if (!email || !password) {
    alert('Please fill in both fields!');
    return;
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address!');
    return;
  }
  
  if (password.length < 6) {
    alert('Password must be at least 6 characters!');
    return;
  }
  
  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Signing you in...';
  submitButton.disabled = true;
  
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    
    if (authError) {
      alert('Wrong email or password! Double-check and try again.');
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      return;
    }
    
    localStorage.setItem('currentUser', JSON.stringify({
      id: authData.user.id,
      email: email,
    }));
    
    alert('Welcome back! Loading your profile...');
    setTimeout(() => window.location.href = 'page.html', 1000);
    
  } catch (error) {
    alert('Wrong email or password! check and try again.');
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
});
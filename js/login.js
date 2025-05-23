
const supabase = window.supabase.createClient(
  'https://jojkaykqkeaeqkswevjo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvamtheWtxa2VhZXFrc3dldmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5OTQwODIsImV4cCI6MjA2MzU3MDA4Mn0.gKpu8PxMmRfV_RZpkW1kaBegSmLglJzTvHdRCtjt_So'
);

document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const validation = validateLoginCredentials(email, password);
  if (!validation.isValid) {
    alert(validation.message);
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
      if (authError.message.includes('Invalid login credentials')) {
        alert('Wrong email or password! Double-check and try again 🔐');
      } else if (authError.message.includes('Email not confirmed')) {
        alert('Please disable email confirmation in Supabase settings 📧');
      } else {
        alert(`Login failed: ${authError.message} 😅`);
      }
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify({
      id: authData.user.id,
      email: email,
      loginTime: new Date().toISOString()
    }));

    alert('Welcome back! 🎉 Loading your profile...');
    setTimeout(() => window.location.href = 'page.html', 1000);
  } catch (error) {
    alert('Something unexpected happened! Please try again 😅');
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
});

function validateLoginCredentials(email, password) {
  if (!email || !password) {
    return { isValid: false, message: 'Please fill in both fields! 📝' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address 📧' };
  }

  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters 🔒' };
  }

  return { isValid: true };
}

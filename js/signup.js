const supabase = window.supabase.createClient(
  'https://jojkaykqkeaeqkswevjo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvamtheWtxa2VhZXFrc3dldmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5OTQwODIsImV4cCI6MjA2MzU3MDA4Mn0.gKpu8PxMmRfV_RZpkW1kaBegSmLglJzTvHdRCtjt_So'
);

document.getElementById('signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const username = document.getElementById('username').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const job = document.getElementById('job').value.trim();
  const projects = document.getElementById('projects').value;

  const validation = validateSignupForm({ email, password, username, phone, address, job, projects });
  if (!validation.isValid) {
    alert(validation.message);
    return;
  }

  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Creating your account...';
  submitButton.disabled = true;

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (authError) throw new Error(authError.message);

    if (!authData.session) {
      alert('Please disable email confirmation in Supabase settings! 📧');
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      return;
    }

    const userData = {
      id: authData.user.id,
      username, email, phone, address, job,
      projects: parseInt(projects),
      created_at: new Date().toISOString()
    };

    const photoInput = document.getElementById('photo');
    if (photoInput.files[0]) {
      const reader = new FileReader();
      reader.onload = async function(e) {
        userData.photo_url = e.target.result;
        await saveProfile(userData);
      };
      reader.readAsDataURL(photoInput.files[0]);
    } else {
      await saveProfile(userData);
    }

    async function saveProfile(data) {
      try {
        const { error } = await supabase.from('profiles').insert([data]);
        if (error) localStorage.setItem('userData', JSON.stringify(data));
      } catch {
        localStorage.setItem('userData', JSON.stringify(data));
      }

      alert('Welcome aboard! 🎉 Taking you to login...');
      setTimeout(() => window.location.href = 'login.html', 1000);
    }

  } catch (error) {
    alert(`Oops! Something went wrong: ${error.message} 😅`);
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
});

function validateSignupForm(data) {
  const { email, password, username, phone, address, job, projects } = data;

  if (!email || !password || !username || !phone || !address || !job || projects === '') {
    return { isValid: false, message: 'Please fill in all the fields! 📝' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address 📧' };
  }

  if (password.length < 6) {
    return { isValid: false, message: 'Password needs at least 6 characters 🔒' };
  }

  return { isValid: true };
}


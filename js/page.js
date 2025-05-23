document.addEventListener('DOMContentLoaded', async function() {
  const currentUser = localStorage.getItem('currentUser');

  if (!currentUser) {
    alert('Please log in to access your profile.');
    window.location.href = 'login.html';
    return;
  }

  try {
    const userData = JSON.parse(currentUser);
    const supabase = window.supabase.createClient(
      'https://jojkaykqkeaeqkswevjo.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvamtheWtxa2VhZXFrc3dldmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5OTQwODIsImV4cCI6MjA2MzU3MDA4Mn0.gKpu8PxMmRfV_RZpkW1kaBegSmLglJzTvHdRCtjt_So'
    );

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userData.id)
      .single();

    if (data) {
      updateProfileData(data);
    } else {
      const fallbackData = localStorage.getItem('userData');
      fallbackData ? updateProfileData(JSON.parse(fallbackData)) : showDefaultData();
    }
  } catch (error) {
    const fallbackData = localStorage.getItem('userData');
    fallbackData ? updateProfileData(JSON.parse(fallbackData)) : showDefaultData();
  }

  document.getElementById('logoutBtn')?.addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    alert('See you later! 👋');
    window.location.href = 'login.html';
  });
});

function updateProfileData(user) {
  document.querySelector('.profile-name').textContent = user.username || 'Welcome!';
  document.querySelector('.profile-job').textContent = user.job || 'Your amazing job';
  document.querySelector('.profile-email').textContent = `📧 ${user.email || 'your@email.com'}`;
  document.querySelector('.profile-phone').textContent = `📱 ${user.phone || 'Your phone'}`;
  document.querySelector('.profile-location').textContent = `📍 ${user.address || 'Your location'}`;
  document.querySelector('.stat-number').textContent = user.projects || '0';

  const profilePicture = document.querySelector('.profile-picture');
  const photo = user.photo_url || user.photo;

  if (photo) {
    profilePicture.style.backgroundImage = `url(${photo})`;
  } else {
    profilePicture.style.backgroundImage = 'linear-gradient(135deg, #ff4081, #ff7e5f)';
  }

  profilePicture.style.backgroundSize = 'cover';
  profilePicture.style.backgroundPosition = 'center';
}

function showDefaultData() {
  document.querySelector('.profile-name').textContent = 'Hello there! 👋';
  document.querySelector('.profile-job').textContent = 'Ready to get started?';
  document.querySelector('.profile-email').textContent = '📧 Sign up to see your info';
  document.querySelector('.profile-phone').textContent = '📱 Your phone here';
  document.querySelector('.profile-location').textContent = '📍 Your location here';
  document.querySelector('.stat-number').textContent = '0';

  const profilePicture = document.querySelector('.profile-picture');
  profilePicture.style.backgroundImage = 'linear-gradient(135deg, #ccc, #999)';
  profilePicture.style.backgroundSize = 'cover';
  profilePicture.style.backgroundPosition = 'center';
}

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

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userData.id)
      .single();

    if (data) {
      updateProfileData(data);
    }
  } catch (error) {
    console.error('Error loading profile:', error);
  }

  document.getElementById('logoutBtn')?.addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    alert('See you later!');
    window.location.href = 'login.html';
  });
});

function updateProfileData(user) {
  document.querySelector('.profile-name').textContent = user.username;
  document.querySelector('.profile-job').textContent = user.job;
  document.querySelector('.profile-email').textContent = user.email;
  document.querySelector('.profile-phone').textContent = user.phone;
  document.querySelector('.profile-location').textContent = user.address;
  document.querySelector('.stat-number').textContent = user.projects;

  const profilePicture = document.querySelector('.profile-picture');
  profilePicture.style.backgroundImage = `url(${user.photo_url})`;
  profilePicture.style.backgroundSize = 'cover';
  profilePicture.style.backgroundPosition = 'center';
  
}
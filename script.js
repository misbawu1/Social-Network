const postForm = document.querySelector('#post-form');
const postText = document.querySelector('#post-text');
const posts = document.querySelector('#posts');
const toast = document.querySelector('#toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

postText.addEventListener('input', () => {
  postText.style.height = 'auto';
  postText.style.height = `${postText.scrollHeight}px`;
});

postForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = postText.value.trim();
  if (!message) {
    postText.focus();
    showToast('Write a little something before posting.');
    return;
  }

  const card = document.createElement('article');
  card.className = 'post-card new-post';
  card.dataset.category = 'Following';
  card.innerHTML = `
    <div class="post-top"><div class="avatar avatar-lilac">JD</div><div class="post-author"><strong>Jamie Davis</strong><span>Just now</span></div><button class="more-button" aria-label="More options">···</button></div>
    <div class="post-body"><p></p></div>
    <div class="post-actions"><button class="like-button"><span>♡</span> <b>0</b></button><button class="comment-button"><span>▢</span> <b>0 comments</b></button><button class="share-button"><span>↗</span> Share</button><button class="bookmark-button" aria-label="Save post">♧</button></div>`;
  card.querySelector('.post-body p').textContent = message;
  posts.prepend(card);
  postText.value = '';
  postText.style.height = 'auto';
  showToast('Your post is on the feed!');
});

posts.addEventListener('click', (event) => {
  const like = event.target.closest('.like-button');
  if (like) {
    const count = like.querySelector('b');
    const liked = like.classList.toggle('liked');
    count.textContent = String(Number(count.textContent) + (liked ? 1 : -1));
    like.querySelector('span').textContent = liked ? '♥' : '♡';
    return;
  }
  const save = event.target.closest('.bookmark-button');
  if (save) {
    const saved = save.classList.toggle('saved');
    save.textContent = saved ? '♥' : '♧';
    showToast(saved ? 'Saved for later.' : 'Removed from saved posts.');
    return;
  }
  if (event.target.closest('.comment-button')) showToast('Comments are coming soon.');
  if (event.target.closest('.share-button')) showToast('Sharing is coming soon.');
});

document.querySelector('#photo-button').addEventListener('click', () => {
  showToast('Photo uploads are coming soon.');
});

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector('.tab-underline').style.width = `${tab.offsetWidth}px`;
    document.querySelector('.tab-underline').style.left = `${tab.offsetLeft}px`;
    const filter = tab.dataset.filter;
    document.querySelectorAll('.post-card').forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

document.querySelectorAll('.follow-button').forEach((button) => {
  button.addEventListener('click', () => {
    const following = button.classList.toggle('following');
    button.innerHTML = following ? 'Following <span>✓</span>' : 'Follow <span>+</span>';
    showToast(following ? 'You’re connected!' : 'You unfollowed this person.');
  });
});


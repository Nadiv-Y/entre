$(document).ready(function() {
  const usersAPI = 'https://randomuser.me/api/';
  const firstLoad = 40;
  const scrollLoad = 10;

  let users = JSON.parse(localStorage.getItem('users')) || [];
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const usersContainer = $('.users-grid');
  const favoritesCounter = $('#favorites-counter span');

  // Render users
  function renderUsers(newUsers = [], append = true) {
    const cardsHtml = newUsers.map(user => {
      const isFav = favorites.find(fav => fav.login.uuid === user.login.uuid);
      return `
        <div class="user-card ${isFav ? 'favorite' : ''}" data-id="${user.login.uuid}">
          <img src="${user.picture.medium}" alt="${user.name.first}">
          <div><strong>${user.name.first} ${user.name.last}</strong></div>
          <div>Gender: ${user.gender}</div>
          <div>Age: ${user.dob.age}</div>
          <div>Email: ${user.email}</div>
          <button class="fav-btn">${isFav ? 'Remove from Favorite' : 'Add to Favorite'}</button>
        </div>
      `;
    }).join('');

    if (append) {
      usersContainer.append(cardsHtml);
    } else {
      usersContainer.html(cardsHtml);
    }

    // Make container sortable (drag-and-drop)
    usersContainer.sortable({
      items: '.user-card',
      placeholder: "user-card-placeholder",
      cursor: "move",
      tolerance: "pointer",
      update: function() {
        saveUsersOrder(); // Save new order to localStorage
      }
    });
  }

  // Save users order in localStorage
  function saveUsersOrder() {
    const orderedUsers = [];
    $('.user-card').each(function() {
      const id = $(this).data('id');
      const user = users.find(u => u.login.uuid === id);
      if (user) orderedUsers.push(user);
    });
    users = orderedUsers;
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Update favorites counter
  function updatFavoritesCounter() {
    favoritesCounter.text(favorites.length);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  // Load users from API
  function loadUsers(count, append = true) {
    $.ajax({
      url: usersAPI,
      data: { results: count },
      dataType: 'json',
      success: function(data) {
        users = append ? users.concat(data.results) : data.results;
        localStorage.setItem('users', JSON.stringify(users));
        renderUsers(data.results, append);
      }
    });

  }
            console.log(users , favorites);

  // Initial load
  if (users.length === 0) {
    loadUsers(firstLoad);
  } else {
    renderUsers(users, false);
  }
  updatFavoritesCounter();

 // Favorites button click
usersContainer.on('click', '.fav-btn', function() {
  const $card = $(this).closest('.user-card');
  const id = $card.data('id');
  const user = users.find(u => u.login.uuid === id);
  if (!user) return;

  const index = favorites.findIndex(f => f.login.uuid === id);

  if (index >= 0) {
    // Remove from favorites
    favorites.splice(index, 1);
    $(this).text('Add to Favorite');
    $card.removeClass('favorite'); // remove highlight
  } else {
    // Add to favorites
    favorites.push(user);
    $(this).text('Remove from Favorite');
    $card.addClass('favorite'); // add highlight
  }

  updatFavoritesCounter();
});


  // Clear All Favorites
$('#clear-favorites').on('click', function () {
  if (favorites.length === 0) {
    alert('No favorites to clear.');
    return;
  }

  // Optional confirmation
  if (!confirm('Are you sure you want to remove all favorites?')) return;

  favorites = [];
  localStorage.removeItem('favorites');
  updatFavoritesCounter();

  // Reset all buttons back to "Add Favorite"
  $('.fav-btn').text('Add Favorite');
  $('.user-card').removeClass('favorite');
});

// Reset Users (keep favorites and show them first)
$('#refresh-users').on('click', function () {
  if (!confirm('This will reload new random users but keep your favorites at the top. Continue?')) return;

  // Keep a copy of current favorites
  const favCopy = [...favorites];

  // Clear only the users list from storage
  users = [];
  localStorage.removeItem('users');

  // Load new users from API
  $.ajax({
    url: usersAPI,
    data: { results: firstLoad },
    dataType: 'json',
    success: function (data) {
      // Combine favorites + new random users
      const combined = [...favCopy, ...data.results];

      users = combined;
      localStorage.setItem('users', JSON.stringify(users));

      // Render with favorites first
      renderUsers(users, false);
      updatFavoritesCounter();
    }
  });
});


  // Endless scroll
  $(window).on('scroll', function() {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 50) {
      loadUsers(scrollLoad);
    }
  });
});

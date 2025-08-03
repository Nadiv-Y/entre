export const users = [
  {
    email: 'yossi.arye@reqres.in',
    first_name: 'Yossi',
    last_name: 'Arye',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
    role: 2
  },
  {
    email: 'israel.israeli@reqres.in',
    first_name: 'Israel',
    last_name: 'Israeli',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
    role: 3
  },
  {
    email: 'john.doe@reqres.in',
    first_name: 'John',
    last_name: 'Doe',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
    role: 3
  },
]

export function addUsersToHtml(users) {
  console.log(users)
  const ul = document.querySelector('#users')
  ul.innerHTML = ''
  for (const user of users) {
    const li = document.createElement('li')
    li.innerHTML = `ID: <b>${user.id}</b>, Full Name: <b>${user.first_name} ${user.last_name}</b>, Email: <b>${user.email}</b>`
    ul.appendChild(li)
  }
}

export function addUserToHtml(user, element) {
  element.append(
    `<li>
        ID: <b>${user.id}</b>,
        Full Name: <b>${user.first_name} ${user.last_name}</b>,
        Website Name: <b>${user.website}</b>,
        Role Name: <b>${user.roleName}</b>,
        Credentials: <b>${user.credentials}</b>
    </li>`
  )
}

export function testLogger() {
  console.log('I handled now!')
}

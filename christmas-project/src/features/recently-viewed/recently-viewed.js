//  HELPER COMMENT: Example starter code for recently viewed feature
// this is just a placeholder file to get you started
// you can use the selected elements to do the logic of updating the recently viewed list
// and attach it as a callback to the employee card click event

const RECENTLY_VIEW_MAX_SIZE = 5;
const recentlyViewedList = document.getElementById('recent-employees');

export function updateRecentlyViewedList(employee) {
  const li = document.createElement('li');

  li.textContent = employee.name;

  recentlyViewedList.prepend(li);

  if (recentlyViewedList.children.length > RECENTLY_VIEW_MAX_SIZE) {
    recentlyViewedList.lastElementChild.remove();
  }
}

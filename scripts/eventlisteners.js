/**
 * Created by Jackie on 2016-08-16.
 */

$("#home_category_add").on("tap", function () {
  var input = $("#home_category_input");
  // get value
  var value = input.val();

  if (value) {
    // reset values
    input.val("");
    // add category ( value, callback)
    addCategory(value);
    loadCategory(home_getCategory());
  } else {
    validationError("#home_category_input");
    notificationMessage("Category name required!");
  }
});

// add todos button click
$("#home_addTodo").on("tap", function () {
  var required = false;

  var todoDesc = home_getTodoDesc();
  var category = home_getCategory();
  var date = home_getDate();
  var priority = home_GetPriority();
  var location = getLocationObject();

  if (!todoDesc) {
    required = true;
    validationError("#home_todoDesc");
  }

  if (!date) {
    required = true;
    validationError("#home_date")
  }

  // all required field filled
  if (!required) {
    // reset form
    home_setTodoDesc("");
    home_resetPriority();
    home_setDate("");
    home_setAddCategory("");
    home_resetLocation();

    // reload
    loadCategory(retrieveCategory());
    loadHistoryDropdown(retrieveTodo());
    // open popup
    notificationMessage("Todo added!");
    // created todoObject
    var todo = createTodo(todoDesc, category, priority, date, location);
    // add to local storage
    addTodoToList(todo);
  } else {
    notificationMessage("Red fields required!");
  }
});

$("#home_popup_maps_button").on("tap", function () {
  if (navigator.geolocation) {
    var mapNode = $("#popup_googleMap");
    var height = $(window).height();;
    mapNode.css({width: height * 0.45, height: height * 0.8});
    navigator.geolocation.getCurrentPosition(function (position) {
      initMap(position.coords.latitude, position.coords.longitude, true);
    })
  } else {
    notificationMessage("No gelocation support!");
  }
});

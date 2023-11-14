function skillsMember() {
  // Skills
  $(".skills").waypoint(
    function () {
      $(".skills .skill-progress span").each(function () {
        $(this).animate(
          {
            width: $(this).attr("data-progress") + "%",
          },
          1000
        );
      });
    },
    { offset: "80%" }
  );
}

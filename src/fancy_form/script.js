
var validations = [
  {inputName: 'address', isRequired: true },
  {inputName: 'amount', isRequired: true, regex: new RegExp(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/)},
  {inputName: 'otp', isRequired: true},
]
$(function () {
  $(".field-wrapper .field-placeholder").on("click", function () {
    $(this).closest(".field-wrapper").find("input").focus();
  });
  $(".field-wrapper input").on("keyup", function () {
    var value = $.trim($(this).val());
    if (value) {
      $(this).closest(".field-wrapper").addClass("hasValue");
    } else {
      $(this).closest(".field-wrapper").removeClass("hasValue");
    }
  });

  $('#form').submit(function(e) {
    e.preventDefault()
    var errorSpan = (error) => `<span class="error">${error}</span>`
    validations.forEach(function(validation) {
      var field = $(`input[name='${validation.inputName}']`)
      field.parent().parent().find('.error').remove();
      var value = field.val()
      if(validation.isRequired && !value) {
        field.parent().parent().append(errorSpan("This field is required"))
      } else if(validation.regex && !validation.regex.test(value)){
        field.parent().parent().append(errorSpan("Value does not match the required format"))
      } else {

      }
    })

  })
});
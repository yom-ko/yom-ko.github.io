$(() => {
  // Put arrow wrappers into jQuery variables and hide arrow 2 wrapper initially
  const $arrow1Wrapper = $('.arrow_1_wrapper').show();
  const $arrow2Wrapper = $('.arrow_2_wrapper').hide();

  // Auto generate summand1 (a) within the given range [6-9]
  const summand1 = (function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }(6, 9));

  // Auto generate summand2 (b) considering that a+b must be within the given range [11-14]
  const summand2 = (function getSummand2(min, max) {
    const x = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
    const sum = summand1 + x;

    if (sum >= min && sum <= max) {
      return x;
    }

    return getSummand2(11, 14);
  }(11, 14));

  // Insert auto generated summands into the document
  $('.exp_summand_1').text(summand1);
  $('.exp_summand_2').text(summand2);

  // Calculate width for arrow 1 wrapper
  const div1Width = (function (stepLength, stepCount) {
    return stepLength * stepCount;
  }(39.2, summand1));

  // Calculate width for arrow 2 wrapper
  const div2Width = (function (stepLength, stepCount) {
    return stepLength * stepCount;
  }(39.6, summand2));

  // Apply calculated widths to arrow wrappers
  $arrow1Wrapper.width(div1Width);
  $arrow2Wrapper.width(div2Width);

  // Shift arrow 2 start position based on arrow 1 end position
  $arrow2Wrapper.css('left', div1Width + 33);

  // Process user input for the sum input field in the expression
  function processSum() {
    const $inputField = $(this);
    const $inputVal = Number($inputField.val());
    const sum = Number(summand1 + summand2);

    if ($inputVal !== sum) {
      $inputField.addClass('input_err');
    } else {
      $inputField.removeClass('input_err');

      // Replace the input field with a span containing the correct answer
      $inputField.replaceWith(`<span>${$inputVal}</span>`);
    }
  }

  // Process user input for summand 2 (input field above arrow 2)
  function processSummand2UI() {
    const $inputField = $(this);
    const $inputVal = Number($inputField.val());
    const $expSummand2 = $('.exp_summand_2');
    const $expSumQuestion = $('.exp_sum_question');

    if ($inputVal !== summand2) {
      $inputField.addClass('input_err');
      $expSummand2.addClass('exp_summand_err');
    } else {
      $inputField.removeClass('input_err');
      $expSummand2.removeClass('exp_summand_err');

      // Replace the input field with a span containing the correct summand
      $inputField.replaceWith(`<span class="arrow_summand_correct">${$inputVal}</span>`);

      // Replace the question mark with an input field for the user to enter her answer
      $expSumQuestion.replaceWith('<input class="exp_sum_input" type="number" min="0">');
      $('.exp_sum_input').focus();

      // Attach event handler to the expression sum input field
      $('.exp_sum_input').on('blur focusout keyup', processSum);
    }
  }

  // Process user input for summand 1 (input field above arrow 1)
  function processSummand1UI() {
    const $inputField = $(this);
    const $inputVal = Number($inputField.val());
    const $expSummand1 = $('.exp_summand_1');

    if ($inputVal !== summand1) {
      $inputField.addClass('input_err');
      $expSummand1.addClass('exp_summand_err');
    } else {
      $inputField.removeClass('input_err');
      $expSummand1.removeClass('exp_summand_err');

      // Replace the input field with a span containing the correct summand
      $inputField.replaceWith(`<span class="arrow_summand_correct">${$inputVal}</span>`);

      // Fade the arrow 2 in view
      $arrow2Wrapper.fadeIn(1500);

      // ...and focus on its input field
      setTimeout(() => {
        $arrow2Wrapper.children('.arrow_2_summand').focus();
      }, 1700);

      // Attach event handler to arrow 2 summand input field
      $('.arrow_2_summand').on('blur focusout keyup', processSummand2UI);
    }
  }

  // Attach event handler to arrow 1 input field
  $('.arrow_1_summand').on('blur focusout keyup', processSummand1UI);
});

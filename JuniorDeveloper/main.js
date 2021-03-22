/*
    Welcome applicants!
    The point of this little test is to help us determine your skillset.
    On the job it will be very common that you are handed an unfamiliar codebase
    and instructed to debug and determine what is not functioning properly.
    Once you have fixed this properly, instructions will be printed to your terminal
    instructing you on what to do for your next steps.

    The two key concepts here are a caesar cipher and a railroad code

    Your goal is to decode the secret message below stored in secret_message

    Good luck!

    - Ryan

    P.S
    I hope you enjoy puzzles
    */
function encode_railroad(secret_phrase) {
  let toggle = true;
  let upper_track = [];
  let lower_track = [];
  secret_phrase.split(" ").forEach((word) => {
    if (toggle) {
      upper_track.push(word);
      toggle = false;
    } else {
      lower_track.push(word);
      toggle = true;
    }
  });
  return `${upper_track.join(" ")}\r\n${lower_track.join(" ")}`;
}

// Updated decode method
function decode_railroad(encoded_phrase) {
  //split the phrase by returned new line
  let mixed_array = encoded_phrase.split("\r\n");

  let first_array = [];
  let second_array = [];

  //push each phase into an empty array
  mixed_array.map((phrase, index) => {
    if (index % 2 === 0) {
      first_array.push(phrase);
    } else {
      second_array.push(phrase);
    }
  });

  let upper = first_array.join().split(" ");
  let lower = second_array.join().split(" ");

  //return the string by mapping both arrays by index
  return []
    .concat(...upper.map((word, index) => [word, lower[index]]))
    .join(" ");
}

// this is a helper method to shift letters forward by a set number of places
// you will probably need to implement something in reverse...
function get_next_char(char, places_to_go_forward) {
  let alpha = "abcdefghijklmnopqrstuvwxyz";
  let alpha_arr = alpha.split("");
  let index = alpha_arr.indexOf(char);

  for (var i = 0; i < places_to_go_forward; i++) {
    //h = 4 index = 4
    index += 1;
    if (index > 25) {
      index = 0;
    }
  }

  return alpha_arr[index];
}

function get_previous_char(char, places_to_go_backward) {
  let alpha = "abcdefghijklmnopqrstuvwxyz";
  let alpha_arr = alpha.split("");
  let index = alpha_arr.indexOf(char);

  // decrease index by seed value
  for (var i = 0; i < places_to_go_backward; i++) {
    index -= 1;
    if (index < 0) {
      index = 25;
    }
  }

  return alpha_arr[index];
}

function shuffle_letter(letter_to_shuffle, places_to_shuffle) {
  // with places_to_shuffle = 1, a becomes b, b becomes c, etc.
  let caesar_string = letter_to_shuffle;
  if (letter_to_shuffle.match(/^[a-z]+$/)) {
    caesar_string = get_next_char(letter_to_shuffle, places_to_shuffle);
  }
  return caesar_string;
}

function unshuffle_letter(letter_to_unshuffle, places_to_unshuffle) {
  let new_string = letter_to_unshuffle;
  if (letter_to_unshuffle.match(/^[a-z]+$/)) {
    new_string = get_previous_char(letter_to_unshuffle, places_to_unshuffle);
  }
  return new_string;
}

function encode_secret_message(secret_message, seed) {
  let encoded_message = "";
  let index = 0;
  secret_message.split(" ").forEach((word) => {
    let caesar_seed = parseInt(seed[index]);
    let caesared_word = "";
    word.split("").forEach((char) => {
      caesared_word += shuffle_letter(char, caesar_seed);
    });
    encoded_message += `${caesared_word} `;
    index += 1;
  });
  return encode_railroad(encoded_message);
}

function decode_secret_message(secret_message, seed) {
  let final_decoded_message = "";
  let index = 0;
  let decoded_message = decode_railroad(secret_message);
  decoded_message.split(" ").forEach((word) => {
    let caesar_seed = parseInt(seed[index]);
    let caesared_word = "";
    word.split("").forEach((char) => {
      caesared_word += unshuffle_letter(char, caesar_seed);
    });
    final_decoded_message += `${caesared_word} `;
    index += 1;
  });
  return final_decoded_message;
}

(function () {
  // console.log("Welcome to the Cloverhound Junior Software Developer test");
  // do not edit either seed or secret message as it will prevent you from completing this assessment.
  let seed = "4578697581264578697781265583416";
  let secret_message =
    "gsrkvexypexmsrw! ohcl znoy wslhzl rwja@ktwdmzpwcvl.kwu aqwt jezsvmxi huk eua h wz rgtuqp. xzgojhy apwctl nv yurazout.\r\ndtz awtdml ydiiun. jrfnq xjui yurazout, mtggd, epmbpmz jan jha eph znk qnsj eh efwfmpqfs";
  // this code below is optional and not necessary for your solution, but may give you some insight as to how
  // the above message was encoded

  let dev_message = decode_secret_message(secret_message, seed);
  console.log(dev_message);
})();
